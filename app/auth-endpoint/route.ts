import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await auth.protect(); // ensure user is authenticated

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  if (!sessionClaims?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!sessionClaims?.fullName) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!sessionClaims?.image) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Start a session which will be used to authorise the user to access the room
  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  });

  // Check if the user is in the room and allowed to be in it
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "Unauthorized access to room" },
      { status: 403 }
    );
  }
}
