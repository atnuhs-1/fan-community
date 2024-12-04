import { SquareChartGantt } from "lucide-react";
import Link from "next/link";

interface TimelineSectionProps {
  communityId: string;
}

export function TimelineSection({ communityId }: TimelineSectionProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">タイムライン</h2>
        <Link
          href={`/timeline/${communityId}`}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <SquareChartGantt className="w-5 h-5" />
          タイムラインへ
        </Link>
      </div>

      <div className="h-32 p-4 shadow-inner shadow-gray-200 bg-white rounded-md">
        aa
      </div>
    </div>
  );
}