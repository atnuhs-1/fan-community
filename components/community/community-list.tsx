import { getCommunityList } from "@/app/actions/communities";
import Link from "next/link";
import { Button } from "../ui/button";
import { CommunityCard } from "./community-card";

interface CommunityListProps {
  title?: string;
}

export default async function CommunityList({ title = "コミュニティ" }: CommunityListProps) {
  const communityList = await getCommunityList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <Link href="/community/create">
          <Button>
            新規作成
          </Button>
        </Link>
      </div>

      {communityList.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">コミュニティがまだ作成されていません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityList.map((community) => (
            <Link key={community.id} href={`/community/${community.id}`}>
              <CommunityCard community={community} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}