import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await auth.protect(); // Server-side authentication
        const { sessionClaims } = await auth();
        const { room } = await req.json();

        if (!room) {
            return NextResponse.json({ message: "Room parameter is required" }, { status: 400 });
        }

        const session = liveblocks.prepareSession(sessionClaims?.email!, {
            userInfo: {
                name: sessionClaims?.fullName!,
                email: sessionClaims?.email!,
                avatar: sessionClaims?.image!
            }
        });

        //  Corrected room check.
        const usersInRoomDoc = await adminDb.collectionGroup("rooms").where("userId", "==", sessionClaims?.email).where("roomId", "==", room).get(); //most efficient

        const userInRoom = usersInRoomDoc.docs[0];

        if (userInRoom?.exists) {
            session.allow(room, session.FULL_ACCESS);
            const { body, status } = await session.authorize();
            console.log("User authorized for room:", room); // Added room to log
            return new Response(body, { status });
        } else {
            console.log(`User ${sessionClaims?.email} is not in room: ${room}`);
            return NextResponse.json(
                { message: "You are not in this room" },
                { status: 403 }
            );
        }
    } catch (error) {
        console.error("Error authenticating user or authorizing session:", error); // Log the error
        return NextResponse.json(
            { message: "Authentication or authorization error" },
            { status: 500 } // Internal server error
        );
    }
}



//todo
//create a redirect if a user is not in a room or unauthorized, shpowing a lottie animation telling them to do so
