import { Bell, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/ranking">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Trophy className="h-5 w-5" />
        </Button>
      </Link>
      <Link href="/notifications">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
      </Link>
      <Link href="/post">
        <Button className="bg-slate-900 hover:bg-orange-600 text-white">
          投稿する
        </Button>
      </Link>
    </div>
  );
}