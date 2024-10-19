import { UserButton } from "@/features/auth/components/user-button"
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { Modal } from "@/components/ui/modals";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const navigate = useNavigate();


  const {data, isLoading} = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(()=> {
    if(isLoading) return;


    if(workspaceId) {
      navigate(`/workspace/${workspaceId}`, {replace: true});
    }
    else if(!open) {
      setOpen(true)
    }

  }, [workspaceId, isLoading, open, navigate, setOpen])

  return (
    <div>
      <Modal />
      <UserButton />

    </div>
  )
}

export default HomePage