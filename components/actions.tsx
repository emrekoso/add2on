"use client";

import React from 'react';
import {Link2, Pencil, Trash2} from "lucide-react";
import {DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import ConfirmModal from "@/components/confirm-modal";
import {Button} from "@/components/ui/button";
import {useRenameModal} from "@/store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
                 }: ActionsProps) => {
    const {onOpen} = useRenameModal();

    const {mutate, pending} = useApiMutation(api.org.remove);

    const handleDelete = () => {
        mutate({id})
            .then(() => toast.success("Org deleted successfully"))
            .catch(() => toast.error("Failed to delete org"))
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`
        ${window.location.origin}/org/${id}`,
            )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60">
                <DropdownMenuItem
                    onClick={handleCopyLink}
                className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2"/>
                    Edit
                </DropdownMenuItem>
                <ConfirmModal
                header="Delete org?"
                description="This will delete the org and all of its contents with it."
                disabled={pending}
                onConfirm={handleDelete}>
                    <Button
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;