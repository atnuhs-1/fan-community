import { getLivesList } from "@/app/lib/live/data"; // 作成必要
import { Button } from "../ui/button";
import Link from "next/link";
import { TimelineNavigationCard } from "./timeline-card";

interface TimelineNavigationListProps {
  communityId: string;
  title?: string;
}

export default async function TimelineNavigationList({
  communityId,
  title = "ライブ・イベント",
}: TimelineNavigationListProps) {
  const liveList = await getLivesList(communityId);

  return (
    <div className="">
      <div className="flex flex-row items-center gap-8 ps-8 pt-4 pb-1 pe-8">
        <h2 className="flex w-full overflow-hidden font-semibold text-2xl">
          {title}
        </h2>
        <Link href={`/community/${communityId}/timeline`} className="flex">
          <Button className="py-1" size="sm">すべての投稿</Button>
        </Link>
      </div>

      {liveList.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            ライブ・イベントがまだ登録されていません
          </p>
        </div>
      ) : (
        <div className="overflow-y-hidden overflow-x-scroll hide-scrollbar px-8 py-2 pb-5 pt-1">
          <ul className="flex w-fit flex-row">
            {liveList.map((live) => (
              <li key={live.id} className="mr-4 lg:mr-5">
                <TimelineNavigationCard 
                  live={live} 
                  communityId={communityId} 
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}