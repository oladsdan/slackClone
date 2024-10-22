import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal(); // we call the state from the hook
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const { mutate, isPending } = useCreateWorkspace();

    

    //we create a function for submiting

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({name}, {
            onSuccess(Id) {
                toast.success("Workspace created")
                navigate(`/workspace/${Id}`);
                handleClose();
            }

        })
    }

    const handleClose = () => {
        setOpen(false);
        setName("");
        
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Add a Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Workspace name e.g 'Work', 'Personal', 'Home' "
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            create
                        </Button>
                    </div>

                </form>
            </DialogContent>

        </Dialog>
    )
}