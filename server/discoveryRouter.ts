import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { discoverySubmissions } from "../drizzle/schema";
import { desc } from "drizzle-orm";

const answerSchema = z.object({
  question: z.string(),
  selectedOptions: z.array(z.string()),
  otherText: z.string(),
});

export const discoveryRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        answers: z.array(answerSchema),
        contactName: z.string().optional(),
        contactEmail: z.string().optional(),
        contactCompany: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Save to database (primary — never lost)
      const db = await getDb();
      if (db) {
        await db.insert(discoverySubmissions).values({
          contactName: input.contactName ?? null,
          contactEmail: input.contactEmail ?? null,
          contactCompany: input.contactCompany ?? null,
          answersJson: JSON.stringify(input.answers),
        });
      }

      // 2. Format notification content
      let content = `📋 NEW DISCOVERY QUESTIONNAIRE SUBMISSION\n`;
      content += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      if (input.contactName || input.contactEmail || input.contactCompany) {
        content += `👤 CONTACT INFORMATION\n`;
        if (input.contactName) content += `   Name: ${input.contactName}\n`;
        if (input.contactEmail) content += `   Email: ${input.contactEmail}\n`;
        if (input.contactCompany) content += `   Company: ${input.contactCompany}\n`;
        content += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
      }

      for (const answer of input.answers) {
        content += `❓ ${answer.question}\n`;
        if (answer.selectedOptions.length > 0) {
          content += `   Selected:\n`;
          for (const opt of answer.selectedOptions) {
            content += `   ✓ ${opt}\n`;
          }
        }
        if (answer.otherText) {
          content += `   Other: ${answer.otherText}\n`;
        }
        if (answer.selectedOptions.length === 0 && !answer.otherText) {
          content += `   (No answer provided)\n`;
        }
        content += `\n`;
      }

      content += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      content += `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET\n`;
      content += `View all submissions at: revenuerelaysystems.com/admin/submissions\n`;

      const title = `Discovery Form: ${input.contactName || input.contactCompany || "New Submission"}`;

      // 3. Send notification (best-effort — DB is the source of truth)
      try {
        await notifyOwner({ title, content });
      } catch (err) {
        console.warn("[Discovery] Notification failed (submission still saved to DB):", err);
      }

      return { success: true };
    }),

  // Admin-only: list all submissions
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db
      .select()
      .from(discoverySubmissions)
      .orderBy(desc(discoverySubmissions.createdAt));
    return rows.map((row) => ({
      ...row,
      answers: JSON.parse(row.answersJson) as Array<{
        question: string;
        selectedOptions: string[];
        otherText: string;
      }>,
    }));
  }),
});
