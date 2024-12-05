import { Users, MessageSquare, ArrowRight } from "lucide-react";
import { CommunityWithMeta } from "@/types/community";

interface CommunityCardProps {
  community: CommunityWithMeta;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div
      className="group overflow-hidden rounded-lg"
      style={{ width: "210px" }}
    >
      <div className="overflow-hidden rounded-lg bg-gray-200 aspect-video">
        <div className=""></div>
      </div>
      <div className="flex flex-col justify-start rounded-b-lg gap-2 p-2">
        <h6 className="line-clamp-1 min-h-10 font-semibold group-hover:text-blue-500">
          {community.name}
        </h6>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex gap-2 text-sm text-muted-foreground group-hover:text-blue-500">
              <Users className="w-4 h-4" />
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
  );
}
