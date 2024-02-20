"use client";

import EmptySearch from "@/app/(dashboard)/_components/empty-search";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

import React from 'react';
import EmptyFavorites from "@/app/(dashboard)/_components/empty-favorites";
import EmptyOrgs from "@/app/(dashboard)/_components/empty-orgs";
import OrgCard from "@/app/(dashboard)/_components/org-card";
import NewOrgButton from "@/app/(dashboard)/_components/new-org-button";

const BoardList = ({orgId, query}: BoardListProps) => {
    const data = useQuery(api.orgs.get, {orgId})

    if (data === undefined) {

        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? "Favorites orgs" : "Team orgs"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewOrgButton orgId={orgId} disabled/>
                    {data?.map((org: any) => (
                        <OrgCard.Skeleton key={org._id}/>
                    ))}
                </div>
            </div>
        )
    }

    if (!data?.length && query.search) {
        return <EmptySearch/>
    }

    if (!data?.length && query.favorites) {
        return <EmptyFavorites/>
    }

    if (!data.length) {
        return <EmptyOrgs/>
    }
    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorites orgs" : "Team orgs"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewOrgButton orgId={orgId}/>
                {data?.map((org) => (
                    <OrgCard
                    key={org._id}
                    id={org._id}
                    title={org.title}
                    imageUrl={org.imageUrl}
                    authorId={org.authorId}
                    authorName={org.authorName}
                    createdAt={org._creationTime}
                    orgId={org.orgId}
                    isFavorite={false}/>
                ))}
            </div>
        </div>
    );
};

export default BoardList;