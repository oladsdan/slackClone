import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetAWorkspaces } from "@/features/workspaces/api/use-get-Aworkspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";


const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
    const {data: workspace, isLoading: workspaceLoading} = useGetAWorkspaces({id: workspaceId});

    if (memberLoading || workspaceLoading) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white" />

            </div>
        )
    }
    //this is to help show the user if a url that does not exist is loaded
    if (!workspace || !member) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">
                  Workspace Not found
                </p>

            </div>
        )
    }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
        <WorkspaceHeader workspace={workspace} isAdmin={member?.role === "admin"} />
    </div>
  )
}

export default WorkspaceSidebar