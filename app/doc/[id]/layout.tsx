import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  await auth.protect();
  
  return <div>{children}</div>;
}

export default DocLayout;
