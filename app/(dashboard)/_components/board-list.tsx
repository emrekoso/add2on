"use client";

import EmptySearch from "@/app/(dashboard)/_components/empty-search";

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

const BoardList = ({orgId, query}: BoardListProps) => {
    const data = [] // TODO: API Comes here.

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
            {JSON.stringify(query)}
        </div>
    );
};

export default BoardList;