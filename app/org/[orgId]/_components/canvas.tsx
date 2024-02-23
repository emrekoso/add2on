"use client";

import Info from "@/app/org/[orgId]/_components/info";
import Participants from "@/app/org/[orgId]/_components/participants";
import Toolbar from "@/app/org/[orgId]/_components/toolbar";

import {useSelf} from "@/liveblocks.config";

interface CanvasProps {
    orgId: string;
};

export const Canvas = ({orgId}: CanvasProps) => {
    const info = useSelf((me) => me.info);

    return (
        <main
        className="h-full w-full relative bg-neutral-100 touch-none">
            <Info/>
            <Participants/>
            <Toolbar/>
        </main>
    )
}