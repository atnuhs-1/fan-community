import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-component";
import { getCommunityList } from "./actions/communities";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  // console.log(session);

  if (!session?.user && userId) {
    return (
      <div className="flex flex-col rounded-md bg-neutral-100">
        <p className="whitespace-pre-wrap break-all px-4 py-6">
          No session data. Sign In first
        </p>
        <SignIn />
      </div>
    );
  }

  const communityList = await getCommunityList();
  // console.log(communityList);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-neutral-100">
      <h2 className="rounded-t-md p-4 font-bold">Session</h2>
      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(session, null, 2)}
      </pre>
      <div className="flex flex-col">
        <h2 className="font-semibold text-3xl mb-4">コミュニティ一覧</h2>
        <ul className="flex flex-col gap-4">
          {communityList.map((community) => (
            <li key={community.id}>
              <Link
                className="block p-4 rounded-lg bg-white shadow-lg"
                href={`/timeline/${community.id}`}
              >
                {community.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
