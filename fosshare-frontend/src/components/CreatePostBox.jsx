import { useEffect, useState } from "react";

export default function CreatePostBox({ onPostCreated }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/user/profile/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error("Error al obtener el perfil del usuario:", err);
      });
  }, []);

  const handleCreatePost = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/postsecondary/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          title: content.slice(0, 50),
          content,
        }),
      });

      if (response.ok) {
        const createdPost = await response.json();
        onPostCreated(createdPost); // 🧠 notifica al padre (PostFeed)
        setContent(""); // limpia input
      } else {
        const error = await response.json();
        console.error("Error del servidor:", error);
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
    setLoading(false);
  };

  return (
    <>
      {userData ? (
        <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
          <img
            src={userData.profile_picture}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Let’s share what’s going on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleCreatePost}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Create Post"}
          </button>
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
      )}
    </>
  );
}
