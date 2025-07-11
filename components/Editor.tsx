"use client";

import { useRoom } from "@liveblocks/react/suspense";
import { useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        {/* TranslateDocument AI */}
        {/* ChatToDocument AI */}

        {/* Dark Mode */}
      </div>

      {/* BlockNote */}
    </div>
  );
}

export default Editor;
