"use client"

import { getPosts } from "@/app/actions/posts";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

export default function ClientPostList({communityId}: {communityId: string}) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts(communityId);
      if (result.success && result.posts){
        setPosts(result.posts);
      }
    }
    
    fetchPosts();
  }, [])

  return (
    <div>
    {posts.map((post) => (
      <div key={post.id}>
        <p>{post.content}</p>
        <small>Posted by {post.author.name || "匿名"}</small>
      </div>
    ))}
  </div>
  )
}