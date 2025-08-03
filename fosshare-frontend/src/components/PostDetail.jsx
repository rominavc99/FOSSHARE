// src/pages/PostDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setUserRating(data.user_rating || 0);
      });
  }, [id]);

  const handleRate = (score) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/rate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ score }),
    })
      .then((res) => res.json())
      .then(() => setUserRating(score));
  };

  const handleComment = () => {
    if (!newComment.trim()) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, data],
        }));
        setNewComment("");
      });
  };

  if (!post) return <div className="text-white">Cargando...</div>;

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-900 rounded-lg mt-4">
        <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          Por {post.user?.name} •{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(post.tags) &&
            post.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
        </div>

        <p className="text-white text-sm mb-4">{post.content}</p>

        <div className="mb-6">
          <p className="text-sm text-white">
            Calificación promedio:{" "}
            <span className="font-semibold">
              {post.average_rating || "Sin calificar"}
            </span>
          </p>
          <p className="text-sm text-white">Tu calificación: {userRating}</p>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRate(value)}
                className={`text-xl px-2 py-1 rounded ${
                  userRating >= value ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deja un comentario..."
          className="w-full p-2 bg-gray-700 text-white rounded-md resize-none mb-3"
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Comentar
        </button>

        <div className="mt-6">
          <h2 className="text-lg text-white font-semibold mb-2">Comentarios</h2>
          {Array.isArray(post.comments) &&
            post.comments.map((comment) => (
              <div key={comment.id} className="mb-3 p-2 rounded-md bg-gray-800">
                <p className="text-white text-sm">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Por {comment.user?.name} el{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
