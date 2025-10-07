import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

// export const escalate = internalMutation({
//   args: {
//     threadId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const conversation = await ctx.db
//       .query("conversations")
//       .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
//       .unique();

//     if (!conversation) {
//       throw new ConvexError({
//         code: "NOT FOUND",
//         message: "conversation Not Found",
//       });
//     }

//     await ctx.db.patch(conversation._id, { status: "escalated" });
//   },
// });

// export const resolve = internalMutation({
//   args: {
//     threadId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const conversation = await ctx.db
//       .query("conversations")
//       .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
//       .unique();

//     if (!conversation) {
//       throw new ConvexError({
//         code: "NOT FOUND",
//         message: "conversation Not Found",
//       });
//     }

//     await ctx.db.patch(conversation._id, { status: "resolved" });
//   },
// });

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    return conversation;
  },
});
