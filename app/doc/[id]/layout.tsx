import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params, // id params is taken from URL itself (/doc/[id])
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  await auth.protect();
  const { id } = await params;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
