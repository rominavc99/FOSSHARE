import { useEffect, useState } from "react";
import CreatePostBox from "./CreatePostBox";
import PostCard from "./PostCard";

export default function PostFeed() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [fossRes, secondaryRes] = await Promise.all([
          fetch(`${apiUrl}/api/posts/`, {
            headers: { Authorization: `Token ${token}` },
          }),
          fetch(`${apiUrl}/api/posts-secondary/`, {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        if (!fossRes.ok || !secondaryRes.ok) {
          throw new Error("Alguna de las respuestas no fue exitosa");
        }

        const fossPosts = await fossRes.json();
        const secondaryPosts = await secondaryRes.json();

        if (Array.isArray(fossPosts) && Array.isArray(secondaryPosts)) {
          setPosts([...fossPosts, ...secondaryPosts]);
        } else {
          console.error("Respuestas inesperadas:", {
            fossPosts,
            secondaryPosts,
          });
        }
      } catch (error) {
        console.error("Error al obtener posts:", error);
      }
    };


    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <section className="flex-1 px-4 py-6 space-y-6">
      <CreatePostBox onPostCreated={addPost} />
      {posts.map((post) => (
        <PostCard key={`${post.id}-${post.title}`} post={post} />
      ))}
    </section>
  );
}
