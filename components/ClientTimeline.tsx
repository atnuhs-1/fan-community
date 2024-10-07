"use client";

import { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import JoinCommunityButton from "./JoinCommunityButton";
import CommunityMemberList from "./CommunityMemberList";
import PostForm from "./PostForm";
import ClientPostList from "./ClientPostList";
import { Member } from "@/types/community";
import { createPost, getPosts } from "@/app/actions/posts";
import PostItem from "./PostItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { joinCommunity } from "@/app/actions/community-members";
import TimeLinePostForm from "./TimeLinePostForm";

type CreatePostResult = {
  success: boolean;
  post?: Post[];
  error?: string;
};

type ClientTimelineProps = {
  initialPosts: Post[];
  initialMembers: Member[];
  communityId: string;
  isSignedIn: boolean;
  isMember: boolean;
  image?: string | null;
};

export default function ClientTimeline({
  initialPosts,
  initialMembers,
  communityId,
  isSignedIn,
  isMember,
  image,
}: ClientTimelineProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isJoined, setIsJoined] = useState(isMember);

  const fetchPosts = useCallback(async () => {
    const result = await getPosts(communityId);
    if (result.success && result.posts) {
      setPosts(result.posts);
    }
  }, [communityId]);

  // useEffect(() => {
  //   const intervalId = setInterval(fetchPosts, 30000);
  //   return () => clearInterval(intervalId);
  // }, [fetchPosts]);

  const handleNewPost = async (content: string) => {
    try {
      const result = await createPost(content, communityId);
      if (result.success && result.post) {
        setPosts((prevPosts) => [result.post, ...prevPosts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = async () => {
    const result = await joinCommunity(communityId);
    console.log(result);
    if (result.success && result.communityMember) {
      setIsJoined(true);
      setMembers((prevMembers) => [result.communityMember, ...prevMembers]);
    } else {
    }
  };

  return (
    <>
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-white border-b p-4">
          <h1 className="text-xl font-bold">タイムライン</h1>
        </header>
        <div className="p-4 space-y-4">
          <TimeLinePostForm
            onSubmit={handleNewPost}
            image={image}
            isSignedIn={isSignedIn}
            isJoined={isJoined}
          />

          <div className="space-y-1">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <aside className="w-80 border-l flex flex-col p-4">
        <div className={`space-y-4 ${isSignedIn && isJoined ? "flex-grow" : ""}`}>
          <CommunityMemberList members={members} />
          <JoinCommunityButton
            communityId={communityId}
            isSignedIn={isSignedIn}
            isJoined={isJoined}
            handleJoin={handleJoin}
          />
        </div>
        <PostForm
          onSubmit={handleNewPost}
          isSignedIn={isSignedIn}
          isJoined={isJoined}
        />
      </aside>

      {/* <ClientPostList communityId={communityId}/> */}
    </>
  );
}
