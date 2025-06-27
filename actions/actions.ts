"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  // only run the rest of the function if user is signed in
  await auth.protect();

  // retrieve session info defined on clerk dashboard (email, fullName, etc.)
  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
  });

  const email = sessionClaims?.email;

  if (!email || typeof email !== "string") {
    throw new Error("No valid email found in session claims.");
  }

  await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
