import { useQuery } from "convex/react";

import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";

interface useGetAWorkspacesProps {
    id: Id<"workspace">
}

export const useGetAWorkspaces = ({id}: useGetAWorkspacesProps) => {
    const data = useQuery(api.workspaces.getById, { id } );
    const isLoading = data === undefined;

    return {data, isLoading};
}