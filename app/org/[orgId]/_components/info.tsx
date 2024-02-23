"use client";

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";

import Image from "next/image";
import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Hint from "@/components/hint";
import {useRenameModal} from "@/store/use-rename-modal";
import Actions from "@/components/actions"
import {Menu} from "lucide-react";
interface InfoProps {
    orgId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

const TabSeperator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}


const Info = ({orgId}: InfoProps) => {
    const { onOpen } = useRenameModal();
    const data = useQuery(api.org.get, {
        id: orgId as Id<"boards">,
    });

    if (!data) return <InfoSkeleton/>

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to home page" side="bottom" sideOffset={10}>
                <Button asChild className="px-2" variant="org">
                    <Link href="/">
                        <Image src="/logo.png"
                        alt="Add2on Logo"
                        height={40}
                        width={40}/>
                        <span className={cn(
                            "font-semibold text-xl ml-2 text-black",
                            font.className,
                        )}>
                            Add2on
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeperator/>
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button variant="org" className="text-base font-normal px-2" onClick={() => onOpen(data._id, data.title)}>
                {data.title}
                </Button>
            </Hint>
            <TabSeperator/>
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="org">
                            <Menu/>
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
    )
}

export default Info;