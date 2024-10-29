import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


const generateCode = () => {
    const code = Array.from({length: 6}, () => "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(Math.random() * 36)]).join("");

    return code;
}



export const create = mutation({
    args: {
        name:v.string(),
    },   
    handler: async(ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId) {
            throw new Error("Unauthorized")
        }

        //create a proper method later
        const joinCode = generateCode();

        const workspaceId = await ctx.db.insert("workspace", {
            name: args.name,
            userId,
            joinCode
        })
        // const workspace = await ctx.db.get(workspaceId);
        // we create members
        await ctx.db.insert("members", {
            userId,
            workspaceId,
            role: "admin"
        })

        return workspaceId
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        //we get the userId
        const userId = await auth.getUserId(ctx);


        if (!userId) {
            return [];
        }
        //we query to get just where the user id is present
        const members = await ctx.db.query("members")
                            .withIndex("by_user_id", (q) => q.eq("userId", userId))
                            .collect();

        //we get the workspace id

        const workspaceIds = members.map((m) => m.workspaceId);

        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId);

            if (workspace) {
                workspaces.push(workspace);
            }
        }

    //    return await ctx.db.query("workspace").collect();

        return workspaces;
    },
});

export const getById = query({
    args: {id: v.id("workspace")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if(!userId) {
            throw new Error("Unauthoriezed")
        }

        const member = await ctx.db.query("members")
                            .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId))
                            .unique();

        if(!member) {
            return null;
        } 

        return await ctx.db.get(args.id);
    }
})