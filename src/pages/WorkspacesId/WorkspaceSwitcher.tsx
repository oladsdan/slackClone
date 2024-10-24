import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { useGetAWorkspaces } from "@/features/workspaces/api/use-get-Aworkspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const WorkspaceSwitcher = () => {
    const navigate = useNavigate();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModal();
    const {data: currentworkspace, isLoading: currentworkspaceLoading} = useGetAWorkspaces({id: workspaceId});
    const {data: workspaces, isLoading: workspacesLoading} = useGetWorkspaces();


    //we dont want to render the current active workspace
    const filteredWorkspaces = workspaces?.filter((workspace) => workspace._id !== currentworkspace?._id);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                {currentworkspaceLoading ? (
                    <Loader className="size-5 animate-spin shrink-0" />
                ) : (
                    currentworkspace?.name.charAt(0).toUpperCase()
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem 
                className="cursor-pointer flex-col justify-start items-start capitalize"
                onClick={() => navigate(`/workspace/${workspaceId}`) }>
                {currentworkspace?.name}
                <span className="text-xs text-muted-foreground">Active workspace</span>
            </DropdownMenuItem>
            {filteredWorkspaces?.map((workspace) => (
                <DropdownMenuItem
                    key={workspace?._id}
                    className="cursor-pointer capitalize overflow-hidden"
                    onClick={() => navigate(`/workspace/${workspace?._id}`) }>
                    <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        {workspace?.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="truncate">{workspace?.name}</p>
                </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-500 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                    <Plus />
                </div>
                create a new workspace
            </DropdownMenuItem>

        </DropdownMenuContent>


    </DropdownMenu>
  )
}

export default WorkspaceSwitcher