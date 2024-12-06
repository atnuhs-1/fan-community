import { Calendar, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Live, Performance } from "@prisma/client";

interface TimelineNavigationCardProps {
  live: Live & {
    performances: Performance[];
  };
  communityId: string;
}

export function TimelineNavigationCard({ live, communityId }: TimelineNavigationCardProps) {
  return (
    <Link href={`/community/${communityId}/timeline?liveId=${live.id}`}>
      <div
        className="group overflow-hidden rounded-lg"
        style={{ width: "210px" }}
      >
        <div className="overflow-hidden rounded-lg bg-gray-200 aspect-video">
          <div className="flex items-center justify-center h-full">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col justify-start rounded-b-lg gap-2 p-2">
          <h6 className="line-clamp-1 min-h-6 font-semibold group-hover:text-blue-500">
            {live.title}
          </h6>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex gap-2 text-sm text-muted-foreground group-hover:text-blue-500">
                <Calendar className="w-4 h-4" />
                <span>{live.performances.length}</span>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground group-hover:text-blue-500">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}