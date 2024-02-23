import React from 'react';
import {Canvas} from "@/app/org/[orgId]/_components/canvas";
import Room from "@/components/room";
import Loading from "@/app/org/[orgId]/_components/loading";

interface OrgIdPageProps {
    params: {
        orgId: string;
    }
}

const OrgIdPage = ({
    params,
                   }: OrgIdPageProps) => {
    return (
        <Room roomId={params.orgId} fallback={<Loading/>}>
            <Canvas orgId={params.orgId}/>
        </Room>
    );
};

export default OrgIdPage;