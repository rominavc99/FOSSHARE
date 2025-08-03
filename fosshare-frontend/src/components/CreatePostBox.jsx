// src/components/CreatePostBox.jsx

export default function CreatePostBox() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
      <img
        src="https://i.pravatar.cc/40"
        alt="User"
        className="w-10 h-10 rounded-full"
      />
      <input
        type="text"
        placeholder="Let’s share what’s going on your mind..."
        className="flex-1 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
        Create Post
      </button>
    </div>
  );
}
