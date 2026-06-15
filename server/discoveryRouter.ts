import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

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
      // Format the responses into a readable email body
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
      content += `Send follow-up to: chuck@ffwlv.com\n`;

      const title = `Discovery Form: ${input.contactName || input.contactCompany || "New Submission"}`;

      // Send via owner notification (delivered to project owner who forwards to chuck@ffwlv.com)
      const delivered = await notifyOwner({ title, content });

      if (!delivered) {
        console.error("[Discovery] Failed to deliver notification");
        throw new Error("Failed to submit responses. Please try again.");
      }

      return { success: true };
    }),
});
