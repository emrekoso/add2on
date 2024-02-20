"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTrigger,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import {useRenameModal} from "@/store/use-rename-modal";
import {FormEventHandler, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

const RenameModal = () => {
    const {mutate, pending} = useApiMutation(api.org.update);

    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e,) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
            .then(() => {
                toast.success("Org renamed");
                onClose();
            })
            .catch(() => {
                toast.error("Failed to rename org");
            })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit org title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this org
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value) }
                    placeholder="Org Title"/>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                            <Button disabled={pending} type="submit">
                                Save
                            </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RenameModal;