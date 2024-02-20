"use client";

import {cn} from "@/lib/utils";
import {Plus} from "lucide-react";
import {api} from "@/convex/_generated/api";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";

interface NewOrgButtonProps {
    orgId: string;
    disabled?: boolean;
};
const NewOrgButton = ({orgId, disabled}: NewOrgButtonProps) => {
    const {mutate, pending} = useApiMutation(api.org.create)
    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Org created succesfully.")
            })
            .catch(() => toast.error("Failed to create org."))
    }

    return (
        <button
        disabled={pending || disabled} onClick={onClick} className={cn(
            "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
            (pending || disabled) && "opacity-70 hover:bg-blue-600 cursor-not-allowed"
        )}>
            <div/>
            <Plus className="h-12 w-12 text-white stroke-1"/>
            <p className="text-sm text-white font-light">
                New Org
            </p>
        </button>
    );
};

export default NewOrgButton;