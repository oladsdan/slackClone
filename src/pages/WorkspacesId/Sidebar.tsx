import { UserButton } from "@/features/auth/components/user-button"
import WorkspaceSwitcher from "./WorkspaceSwitcher"
import { SidebarButton } from "./SidebarButton"
import { Bell, Home, MessagesSquare, MoreHorizontal, } from "lucide-react"
import { useLocation } from "react-router-dom"

const Sidebar = () => {
  const {pathname} = useLocation();

  return (
    <aside className='w-[70px] h-full bg-[#481349]  flex flex-col gap-y-4 break-all items-center pb-4'>
        <WorkspaceSwitcher />
        <SidebarButton icon={Home} Label="Home" isActive = {pathname.includes("workspace")} />
        <SidebarButton icon={MessagesSquare} Label="DMs" />
        <SidebarButton icon={Bell} Label="Activity" />
        <SidebarButton icon={MoreHorizontal} Label="More"  />
        <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
            <UserButton />
            
        </div>
    
    </aside>
    
  )
}

export default Sidebar