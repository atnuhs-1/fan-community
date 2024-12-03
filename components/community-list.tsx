import { getCommunityList } from "@/app/actions/communities";
import Link from "next/link";

export default async function CommunityList() {
  const communityList = await getCommunityList();

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-3xl mb-4">コミュニティ一覧</h2>
      <ul className="flex flex-col gap-4">
        {communityList.map((community) => (
          <li key={community.id}>
            <Link
              className="block p-4 rounded-lg bg-white shadow-lg"
              href={`/community/${community.id}`}
            >
              {community.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}