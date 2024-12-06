import { Users, MessageSquare, ArrowRight } from "lucide-react";
import { PerformanceWithMeta } from "@/types/performance";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface PerformanceCardProps {
  performance: PerformanceWithMeta;
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
  return (
    <div
      className="group overflow-hidden rounded-lg"
      style={{ width: "300px" }}
    >
      <div className="overflow-hidden rounded-lg bg-gray-200 aspect-video">
        <div className=""></div>
      </div>
      <div className="flex flex-col justify-start gap-2 rounded-b-lg p-2">
        <div>
          <h6 className="line-clamp-1 font-semibold group-hover:text-blue-500">
            {performance.live.title}
          </h6>
          <div className="text-sm line-clamp-1 group-hover:text-blue-500">
            {format(new Date(performance.date), "yyyy/MM/dd (E)", {
              locale: ja,
            })}
          </div>
          <div className="text-sm line-clamp-1 group-hover:text-blue-500">
            {" @ "}
            {performance.venue}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            {/* <div className="flex gap-2 text-sm text-muted-foreground group-hover:text-blue-500">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex gap-2 text-sm text-muted-foreground group-hover:text-blue-500">
              <MessageSquare className="w-4 h-4" />
            </div> */}
          </div>

          <div className="opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-opacity">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
