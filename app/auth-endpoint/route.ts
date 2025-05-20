import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await auth.protect(); // Server-side authentication
  try {
    const { sessionClaims } = await auth();

    const { room } = await req.json();

    if (!room) {
      return NextResponse.json({ message: "Room parameter is required" }, { status: 400 });
    }

    // Safely handle potentially missing sessionClaims
    if (!sessionClaims || !sessionClaims.email) {
      return NextResponse.json(
        { message: "User email is missing from session" },
        { status: 400 } // Or 401, depending on your auth logic
      );
    }

    const session = liveblocks.prepareSession(sessionClaims.email, {
      userInfo: {
        name: sessionClaims.fullName || "", // Use a default if fullName is missing
        email: sessionClaims.email,
        avatar: sessionClaims.image || "",    // Use a default if image is missing
      },
    });

    //  Corrected room check.
    const usersInRoomDoc = await adminDb.collectionGroup("rooms")
      .where("userId", "==", sessionClaims.email)
      .where("roomId", "==", room)
      .get(); //most efficient

    const userInRoom = usersInRoomDoc.docs[0];

    if (userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();
      console.log("User authorized for room:", room); // Added room to log
      return new Response(body, { status });
    } else {
      console.log(`User ${sessionClaims.email} is not in room: ${room}`);
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