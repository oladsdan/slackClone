import { mutation, Auth } from 'convex/server';

export default mutation(async ({ auth }: { auth: Auth | null }) => {
  if (!auth) {
    throw new Error("User not authenticated");
  }

  return {
    userId: auth.userId,
    email: auth.email,
  };
});
