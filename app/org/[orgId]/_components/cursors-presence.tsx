"use client";

import {memo} from "react";
import { useOthersConnectionIds} from "@/liveblocks.config";
import {Cursor} from "@/app/org/[orgId]/_components/cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId}/>
            ))}
        </>
    )
}

export const CursorPresence = memo(() => {
    return (
        <>
           {/* TODO: Pencil will come here.*/}
        <Cursors/>
        </>
    )
});

CursorPresence.displayName = "CursorPresence";