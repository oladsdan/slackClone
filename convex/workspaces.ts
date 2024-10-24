import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";



export const create = mutation({
    args: {
        name:v.string(),
    },   
    handler: async(ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId) {
            throw new Error("Unauthoriezed")
        }

        //create a proper method later
        const joinCode = "123456";

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
       return await ctx.db.query("workspace").collect();
    },
});

export const getById = query({
    args: {id: v.id("workspace")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if(!userId) {
            throw new Error("Unauthoriezed")
        }
        return await ctx.db.get(args.id);
    }
})