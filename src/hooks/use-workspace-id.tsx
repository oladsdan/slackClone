import { useParams } from "react-router-dom";

import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = () => {
    const { workspaceId } = useParams<Record<string, string | undefined>>();

    return workspaceId as Id<"workspace">;
}