import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PostCard({ post }) {
  const isFossPost = post.tags && Array.isArray(post.tags);

  const userName = post.user?.name || "Usuario desconocido";
  const userPicture = post.user?.profile_picture || "https://i.pravatar.cc/40";
  const postDate = new Date(post.created_at).toLocaleDateString();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleLike = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/posts/${post.id}/like/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikesCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  if (isFossPost) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg space-y-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={userPicture}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-white text-sm font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">{postDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="text-gray-400 hover:text-red-500 text-lg"
            >
              {liked ? "❤️" : "🤍"} {likesCount}
            </button>

            {post.chart && (
              <div className="bg-gray-900 p-2 rounded text-center text-xs">
                <p className="text-white font-bold">{post.chart}</p>
                <p className="text-green-400">{post.value}</p>
                <p className="text-green-400">{post.change}</p>
              </div>
            )}
          </div>
        </div>

        <h3
          className="text-white font-semibold text-lg cursor-pointer"
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mt-2">{post.content}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {Array.isArray(post.tags) &&
            post.tags.map((tag, index) => (
              <span
                key={tag.id || tag.name || tag || index}
                className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full"
              >
                #{tag.name || tag}
              </span>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-2">
        <img src={userPicture} alt="User" className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-white font-medium text-sm">{userName}</p>
          <p className="text-xs text-gray-400">{postDate}</p>
        </div>
      </div>

      <h3
        className="text-white font-semibold"
        
      >
        {post.title}
      </h3>
      <p className="text-gray-300 text-sm">{post.content}</p>
    </div>
  );
}
