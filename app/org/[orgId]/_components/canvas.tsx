"use client";

import Info from "@/app/org/[orgId]/_components/info";
import Participants from "@/app/org/[orgId]/_components/participants";
import Toolbar from "@/app/org/[orgId]/_components/toolbar";
import {useCallback, useState} from "react";
import {Camera, CanvasMode, CanvasState} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory, useMutation} from "@/liveblocks.config";
import {CursorPresence} from "@/app/org/[orgId]/_components/cursors-presence";
import {pointerEventToCanvasPoint} from "@/lib/utils";

interface CanvasProps {
    orgId: string;
};

export const Canvas = ({orgId}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({x: 0, y: 0})

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();
    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    }, [])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        setMyPresence({cursor: current});
    }, []);

    const onPointerLeave = useMutation(({setMyPresence}) => {
        setMyPresence({cursor: null});
    }, [])

    return (
        <main
            className="h-full w-full relative bg-neutral-100 touch-none">
            <Info orgId={orgId}/>
            <Participants/>
            <Toolbar canvasState={canvasState}
                     setCanvasState={setCanvasState}
                     canRedo={canRedo}
                     canUndo={canUndo}
                     redo={history.redo}
                     undo={history.undo}/>
            <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}>
                <g>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}