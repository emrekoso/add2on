"use client";

import Info from "@/app/org/[orgId]/_components/info";
import Participants from "@/app/org/[orgId]/_components/participants";
import Toolbar from "@/app/org/[orgId]/_components/toolbar";
import {useState} from "react";
import {CanvasMode, CanvasState} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory} from "@/liveblocks.config";

interface CanvasProps {
    orgId: string;
};

export const Canvas = ({orgId}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    return (
        <main
        className="h-full w-full relative bg-neutral-100 touch-none">
            <Info orgId={orgId}/>
            <Participants/>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} redo={history.redo} undo={history.undo}/>
        </main>
    )
}