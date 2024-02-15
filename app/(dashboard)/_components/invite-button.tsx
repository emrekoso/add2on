import {Plus} from "lucide-react";
import {OrganizationProfile} from "@clerk/nextjs";

import {
    DialogContent,
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"

import React from 'react';

const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-950 text-white">
                    <Plus className="h-4 w-4 mr-2"/>
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile/>
            </DialogContent>
        </Dialog>
    );
};

export default InviteButton;