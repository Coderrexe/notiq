"use client";

import {
  ClientSideSuspense,
  RoomProvider as LiveblocksRoomProvider,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";

function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (
    <LiveblocksRoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksRoomProvider>
  );
}

export default RoomProvider;
