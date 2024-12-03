import { auth } from "@/auth";

export default async function SessionInfo() {
  const session = await auth();
  
  return (
    <div>
      <h2 className="rounded-t-md p-4 font-bold">Session</h2>
      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}