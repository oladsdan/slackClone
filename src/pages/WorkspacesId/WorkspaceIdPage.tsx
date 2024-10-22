// import React from 'react'
// import { useParams } from 'react-router-dom'
import { useGetAWorkspaces } from "../../features/workspaces/api/use-get-Aworkspace";
import  {useWorkspaceId }  from "@/hooks/use-workspace-id"
import WorkspaceLayout from "./WorkspaceLayout";
// interface Params {
//     workspaceId: Record<string, string | undefined>;
// }

const WorkspaceIdPage = () => {
      const workspaceId  = useWorkspaceId();
      //we get the workspaceId
      const { data } = useGetAWorkspaces({ id: workspaceId})
  
    // const { workspaceId } = useParams<Record<string, string | undefined>>()
    

  return (

    <WorkspaceLayout>
      <div>data: {JSON.stringify(data)}</div>
    </WorkspaceLayout>
  )
}

export default WorkspaceIdPage