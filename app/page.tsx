import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-component";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="flex flex-col rounded-md bg-neutral-100">
      {session ? (<SignOut />) : (<SignIn />)}
      <h2 className="rounded-t-md bg-neutral-200 p-4 font-bold">Session</h2>
      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
