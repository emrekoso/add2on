import Image from "next/image";

import React from 'react';
import {Button} from "@/components/ui/button";

const EmptyOrgs = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/note.svg" alt="notes" height={250} width={250}/>
            <h2 className="text-2xl font-semibold mt-6">Create your first org!</h2>
            <p className="text-muted-foreground text-sm mt-2">Start creating an org.</p>
            <div className="mt-6">
                <Button size="lg">
                    Create org
                </Button>

            </div>
        </div>
    );
};

export default EmptyOrgs;