import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-component";

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (!session?.user) {
    return <div className="flex flex-col rounded-md bg-neutral-100">
      <p className="whitespace-pre-wrap break-all px-4 py-6">No session data. Sign In first</p>
      <SignIn />
    </div>
  }

  return (
    <div className="flex flex-col rounded-md bg-neutral-100">
      <SignOut />
      <h2 className="rounded-t-md bg-neutral-200 p-4 font-bold">Session</h2>
      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
