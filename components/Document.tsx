"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
  const [data, isLoading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault(); // prevent page from refreshing

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div className=" flex max-w-5xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/* update title... */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Update"}
          </Button>

          {/* IF. */}
          {/* isOwner && InviteUser, delete document */}
        </form>
      </div>
      <div>
        {/* ManageUsers */}

        {/* Avatars */}
      </div>

      {/* Collaborative editor */}
    </div>
  );
}

export default Document;
