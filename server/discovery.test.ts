import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("discovery.submit", () => {
  it("accepts a valid submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.discovery.submit({
      answers: [
        {
          question: "Where are you losing the most time right now?",
          selectedOptions: ["Data entry & manual record-keeping", "Invoicing & billing follow-ups"],
          otherText: "",
        },
        {
          question: "What types of requests come in most often?",
          selectedOptions: ["Open Records / FOIA requests"],
          otherText: "Custom legal research",
        },
        {
          question: "What is the current workflow?",
          selectedOptions: [],
          otherText: "Everything is done via email",
        },
        {
          question: "Where do things get delayed?",
          selectedOptions: ["Intake & initial request processing"],
          otherText: "",
        },
        {
          question: "What would you want automated first?",
          selectedOptions: ["Client intake & request processing", "Invoicing & payment collection"],
          otherText: "",
        },
      ],
      contactName: "Miss Nelson",
      contactEmail: "nelson@example.com",
      contactCompany: "County Publishing Co",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a submission without contact info", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.discovery.submit({
      answers: [
        {
          question: "Where are you losing the most time right now?",
          selectedOptions: ["Reporting & status updates"],
          otherText: "",
        },
      ],
    });

    expect(result).toEqual({ success: true });
  });

  it("does not require authentication (public procedure)", async () => {
    const ctx = createPublicContext();
    // ctx.user is null — should still work
    const caller = appRouter.createCaller(ctx);

    const result = await caller.discovery.submit({
      answers: [
        {
          question: "Test question",
          selectedOptions: ["Option A"],
          otherText: "",
        },
      ],
      contactName: "Test User",
    });

    expect(result).toEqual({ success: true });
  });
});
