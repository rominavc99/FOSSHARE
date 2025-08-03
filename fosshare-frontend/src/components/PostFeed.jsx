import { useState } from "react";
import CreatePostBox from "./CreatePostBox";
import PostCard from "./PostCard";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // agrega el post al inicio
  };

  return (
    <section className="flex-1 px-4 py-6 space-y-6">
      <CreatePostBox onPostCreated={addPost} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
