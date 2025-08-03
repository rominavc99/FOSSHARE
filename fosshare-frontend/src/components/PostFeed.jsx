// src/components/PostFeed.jsx
import { useState } from "react";
import CreatePostBox from "./CreatePostBox";
import PostCard from "./PostCard";

export default function PostFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Joplin vs Standard Notes: Which One Wins?",
      tags: ["finance", "bitcoin", "crypto"],
      author: "Rubén Borbolla",
      timeAgo: "3 weeks ago",
      views: "51,324",
      likes: "36,654",
      comments: 56,
      chart: "BTC",
      value: "$20,788",
      change: "+0.25%",
    },
    {
      id: 2,
      title: "Is GIMP a Real Photoshop Alternative in 2025?",
      tags: ["seo", "blogging", "traffic"],
      author: "Marianne Cordova",
      timeAgo: "3 days ago",
      views: "244,564",
      likes: "10,920",
      comments: 184,
    },
  ]);

  return (
    <section className="flex-1 px-4 py-6 space-y-6">
      <CreatePostBox />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
