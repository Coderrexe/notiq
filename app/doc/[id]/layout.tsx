import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
