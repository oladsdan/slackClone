import Sidebar from "./Sidebar"
import Toolbar from "./Toolbar"

interface workspaceIdLayout {
  children: React.ReactNode}


const WorkspaceLayout = ({children}: workspaceIdLayout) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="h-[calc(100vh-40px)] flex">
        <Sidebar />
        {children}
      </div>
      </div>
  )
}

export default WorkspaceLayout