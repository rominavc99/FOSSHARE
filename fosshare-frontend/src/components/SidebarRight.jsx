import React, { useEffect, useState } from "react";

const RightSidebar = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRecentPosts(data.slice(0, 6))) // Solo los 6 más recientes
      .catch((err) => console.error("Error loading recent posts:", err));
  }, []);

  return (
    <aside className="w-full md:w-1/4 px-4 space-y-6">
      {/* Meetups */}
      <section className="bg-gray-800 p-4 rounded-xl sidebarSection">
        <h2 className="text-lg font-semibold text-white mb-4">Meetups</h2>
        <ul className="space-y-4">
          <li>
            <p className="text-sm text-white">FEB 7 - WHAT IS FOSS?</p>
            <p className="text-xs text-gray-400">
              Remote • CDMX • Part-time • Worldwide
            </p>
          </li>
          <li>
            <p className="text-sm text-white">FEB 3 - FOSS as PRAXIS</p>
            <p className="text-xs text-gray-400">
              Remote • CDMX • Part-time • Worldwide
            </p>
          </li>
          <li>
            <p className="text-sm text-white">FEB 5 - Living of FOSS</p>
            <p className="text-xs text-gray-400">
              Full-time • CDMX • Contract • Worldwide
            </p>
          </li>
        </ul>
      </section>

      {/* Most Recent */}
      <section className="bg-gray-800 p-4 rounded-xl sidebarSection">
        <h2 className="text-lg font-semibold text-white mb-4">Most Recent</h2>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li
              key={post.id}
              className="text-sm text-white hover:underline cursor-pointer"
              title={post.title}
            >
              {post.title.length > 55
                ? post.title.slice(0, 55) + "..."
                : post.title}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default RightSidebar;
