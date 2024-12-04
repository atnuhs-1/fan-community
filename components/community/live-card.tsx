import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { LiveType } from "@prisma/client";
import { getLiveTypeLabel } from "@/lib/utils";

interface Performance {
  id: string;
  date: Date | string;
  venue: string;
}

interface LiveCardProps {
  id: string;
  communityId: string;
  title: string;
  description: string | null;
  liveType: LiveType;
  startDate: Date | string;
  endDate: Date | string | null;
  performances: Performance[];
}

export function LiveCard({
  id,
  communityId,
  title,
  description,
  liveType,
  startDate,
  endDate,
  performances,
}: LiveCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && (
            <p className="text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {getLiveTypeLabel(liveType)}
          </span>
          <Link
            href={`/live/${communityId}/${id}/edit`}
            className="text-blue-600 hover:text-blue-800"
          >
            編集
          </Link>
        </div>
      </div>

      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {format(new Date(startDate), "yyyy/MM/dd", { locale: ja })}
          {endDate && (
            <>
              {" 〜 "}
              {format(new Date(endDate), "yyyy/MM/dd", { locale: ja })}
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          公演数: {performances.length}回
        </div>
      </div>

      <div className="mt-4 pl-4 space-y-1">
        {performances.map((performance) => (
          <div key={performance.id} className="text-sm text-gray-600">
            {format(new Date(performance.date), "yyyy/MM/dd (E)", { locale: ja })}
            {" @ "}
            {performance.venue}
          </div>
        ))}
      </div>
    </div>
  );
}