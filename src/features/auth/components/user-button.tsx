import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";


export const UserButton = () => {
    const {data, isLoading} = useCurrentUser();
    const { signOut } = useAuthActions()

    if(isLoading){
        return <Loader className="size-4 animate-spin text-muted-foreground " />
    }
    if(!data){
        return null;
    }

    const {image, name, email} = data;

    const avatarFallback = name!.charAt(0).toUpperCase()


    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image} className="rounded-full w-20" />
                    <AvatarFallback className="bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-80">
                <DropdownMenuItem onClick={() => signOut()} className="h-10 cursor-pointer">
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

