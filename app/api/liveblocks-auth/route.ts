import {auth, currentUser} from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import {api} from "@/convex/_generated/api";
import {useRouter} from "next/navigation";
import {router} from "next/client";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret: "sk_dev_i_vwtkaO5RDhsPyLLIpPILRoySSB_q4lV4ciRjyDwin4OXH-kpUl0xYbPasUVLgG",
});

export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();


    if (!authorization || !user) {
        return new Response("Unauthorized", {status: 403});
    }

    const {room} = await request.json();
    const org = await convex.query(api.org.get, {id: room});



    if (org?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", {status:403})

    }


    const userInfo = {
        name: user.firstName || "Teammate",
        picture: user.imageUrl,
    }


    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    return new Response(body, {status});
};
