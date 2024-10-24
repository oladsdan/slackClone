import {v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...
  workspace: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  members: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspace"),
    role: v.union(v.literal("admin"), v.literal("member")),
    // role: v.enum(["admin", "member"]),
  })
  //we add index so we can query faster
  .index("by_user_id", ["userId"])
  .index("by_workspace_id", ["workspaceId"])
  .index("by_workspace_id_user_id", ["workspaceId", "userId"])
  
});
 
export default schema;