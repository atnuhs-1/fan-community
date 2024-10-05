"use client";

import { useState } from "react";
import { joinCommunity } from "@/app/actions/community-members";
import { Button } from "./ui/button";

type JoinCommunityButtonProps = {
  communityId: string;
  isSignedIn: boolean;
  isJoined: boolean;
  handleJoin: () => Promise<void>;
};

export default function JoinCommunityButton({
  communityId,
  isSignedIn,
  isJoined,
  handleJoin,
}: JoinCommunityButtonProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {isJoined ? (
        <Button disabled={!isSignedIn || isJoined} className="rounded-full  px-4 py-2">メンバーです</Button> // ファンの総称に変えよかな（例：かなちです）
      ) : (
        <Button
          onClick={handleJoin}
          disabled={!isSignedIn || isJoined}
          className="rounded-full  px-4 py-2"
        >
          コミュニティに参加
        </Button>
      )}

      {error && <div>Error: {error}</div>}
    </div>
  );
}
