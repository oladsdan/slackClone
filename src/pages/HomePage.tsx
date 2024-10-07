import { Button } from "@/components/ui/button"
import { useAuthActions } from "@convex-dev/auth/react"
import { UserButton } from "@/features/auth/components/user-button"


const HomePage = () => {
  
  const { signOut } = useAuthActions()

  return (
    <div>
      HomePage
      <UserButton />
      <Button onClick={() => signOut()}>Sign Out</Button>


    </div>
  )
}

export default HomePage