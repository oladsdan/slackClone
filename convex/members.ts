import { v } from "convex/values";

import { auth } from "./auth";
import { query } from "./_generated/server";

export const current = query({
    args: {workspaceId: v.id("workspace")},
    handler : async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {  
            return null;

        }

        //then we query the member
        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q) => q
                .eq("workspaceId", args.workspaceId)
                .eq("userId", userId)
            )
            .unique();

        if (!member) {
            return null;
        }
        return member;
    }
    
})