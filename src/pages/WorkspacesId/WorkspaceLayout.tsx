import Sidebar from "./Sidebar"
import Toolbar from "./Toolbar"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup  } from "@/components/ui/resizable"
import WorkspaceSidebar from "./WorkspaceSidebar"

interface workspaceIdLayout {
  children: React.ReactNode}


const WorkspaceLayout = ({children}: workspaceIdLayout) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="h-[calc(100vh-40px)] flex">
        <Sidebar />
        <ResizablePanelGroup 
          direction="horizontal"
          autoSaveId="Da-workspace-layout">
          <ResizablePanel
           defaultSize={20}
           minSize={11}
           className="bg-[#5E2C5F]">
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      </div>
  )
}

export default WorkspaceLayout