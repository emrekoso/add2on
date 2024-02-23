"use client";
import Image from "next/image";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api"
import {useRouter} from "next/navigation";

import React from 'react';
import {Button} from "@/components/ui/button";
import {useOrganization} from "@clerk/nextjs";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";

const EmptyOrgs = () => {
    const router = useRouter();
    const {organization} = useOrganization();
    const {mutate, pending} = useApiMutation(api.org.create)

    const onClick = () => {
        if (!organization) return
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Org created succesfully.")
                router.push(`org/${id}`)
            })
            .catch(() => toast.error("Failed to create org."))
    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/note.svg" alt="notes" height={250} width={250}/>
            <h2 className="text-2xl font-semibold mt-6">Create your first org!</h2>
            <p className="text-muted-foreground text-sm mt-2">Start creating an org.</p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create org
                </Button>

            </div>
        </div>
    );
};

export default EmptyOrgs;