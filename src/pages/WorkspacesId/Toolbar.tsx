import { Button } from "@/components/ui/button"
import { useGetAWorkspaces } from "@/features/workspaces/api/use-get-Aworkspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react"


const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetAWorkspaces({ id: workspaceId }) 

  return (
    <div className='bg-[#481349] flex items-center justify-between h-10 p-1.5'>
        <div className='flex-1' />
        <div className='min-w-[200px] max-[640px] grow-[2] shrink'>
            <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2" >
                <Search className="size-4 mr-2 text-white" />
                <span className="text-white text-xs">
                    Search {data?.name}
                </span>
            </Button>
        </div>
        <div className="ml-auto flex-1 flex items-center justify-end">
          <Button variant="transparent" size="iconSm">
            <Info className="size-5 text-white" />
          </Button>

        </div>
    </div>
  )
}

export default Toolbar