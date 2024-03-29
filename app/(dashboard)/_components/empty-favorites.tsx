import Image from "next/image";

import React from 'react';

const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/favorites.svg" alt="favorites" height={140} width={140}/>
            <h2 className="text-2xl font-semibold mt-6">No favorites orgs!</h2>
            <p className="text-muted-foreground text-sm mt-2">No favorites yet.</p>
        </div>
    );
};

export default EmptyFavorites;