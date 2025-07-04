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

  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  });
}
