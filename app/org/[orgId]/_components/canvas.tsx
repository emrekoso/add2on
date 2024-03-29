"use client";

import Info from "@/app/org/[orgId]/_components/info";
import Participants from "@/app/org/[orgId]/_components/participants";
import Toolbar from "@/app/org/[orgId]/_components/toolbar";
import {useCallback, useState} from "react";
import {Camera, CanvasMode, CanvasState, Color, LayerType, Point} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory, useMutation, useStorage} from "@/liveblocks.config";
import {CursorPresence} from "@/app/org/[orgId]/_components/cursors-presence";
import {pointerEventToCanvasPoint} from "@/lib/utils";
import {nanoid} from "nanoid";
import {LiveObject} from "@liveblocks/client";
import {LayerPreview} from "@/app/org/[orgId]/_components/layer-preview";

const MAX_LAYERS = 100;

interface CanvasProps {
    orgId: string;
};

export const Canvas = ({orgId}: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({x: 0, y: 0})
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        {storage, setMyPresence},
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayersIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        });
        liveLayersIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({selection: [layerId]}, {addToHistory: true});
        setCanvasState({mode: CanvasMode.None});
    }, [lastUsedColor])


    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    }, [])

    const onPointerMove = useMutation(({setMyPresence}, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        setMyPresence({cursor: current});
    }, []);

    const onPointerLeave = useMutation(({setMyPresence}) => {
        setMyPresence({cursor: null});
    }, [])

    const onPointerUp = useMutation((
        {},
            e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);


        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    }, [
        camera,
        canvasState,
        history,
        insertLayer,
    ])

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
                 onPointerLeave={onPointerLeave} onPointerUp={onPointerUp}>
                <g style={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`
                }}>
                    {layerIds.map((layerId) => (
                        <LayerPreview
                        key={layerId}
                        id={layerId}
                        onLayerPointerDown={() => {}}
                        selectionColor="#000"/>
                    ))}
                    <CursorPresence/>
                </g>
            </svg>
        </main>
    )
}