"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  // pull in Presence from liveblocks.config.ts (cursor position)
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: React.PointerEvent) {
    // use pageX and pageY instead of clientX and clientY, for full page cursor tracking
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      LiveCursorProvider
    </div>
  );
}

export default LiveCursorProvider;
