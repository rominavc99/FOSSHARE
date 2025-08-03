// src/components/PostCard.jsx

export default function PostCard({ post }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-2">
      <div className="flex items-center space-x-2">
        {post.chart && (
          <div className="bg-gray-900 p-4 rounded-lg text-center text-xs">
            <p className="text-white font-bold">{post.chart}</p>
            <p className="text-green-400">{post.value}</p>
            <p className="text-green-400">{post.change}</p>
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{post.title}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {post.author} • {post.timeAgo}
          </p>
          <div className="flex text-sm text-gray-400 mt-2 gap-4">
            <span>{post.views} Views</span>
            <span>{post.likes} Likes</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">❤</button>
      </div>
    </div>
  );
}
