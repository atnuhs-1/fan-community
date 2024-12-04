import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Users, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommunityWithMeta } from "@/types/community";

interface CommunityCardProps {
  community: CommunityWithMeta;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="h-[104px]">
        <CardTitle className="line-clamp-1">{community.name}</CardTitle>
        {community.description && (
          <CardDescription className="line-clamp-2">
            {community.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {/* <span>{community._count.members}メンバー</span> */}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {/* <span>{community._count.posts}投稿</span> */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {/* 最終更新: {formatDistanceToNow(new Date(community.updatedAt), { locale: ja, addSuffix: true })} */}
        </span>
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          詳細を見る
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}