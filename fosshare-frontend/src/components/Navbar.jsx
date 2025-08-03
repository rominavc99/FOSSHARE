import { FaHome, FaBell, FaBookmark, FaUserCircle } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-orange-400">FOSShare</h1>
        <nav className="hidden md:flex items-center gap-6">
          <FaHome className="hover:text-orange-300 cursor-pointer" />
          <FaBell className="hover:text-orange-300 cursor-pointer" />
          <FaBookmark className="hover:text-orange-300 cursor-pointer" />
        </nav>
      </div>

      <div className="flex-1 mx-4 max-w-lg hidden md:flex items-center bg-gray-800 px-3 py-1 rounded">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Type here to search..."
          className="bg-transparent outline-none text-sm flex-1 text-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center gap-1 text-sm">
          <IoMdCreate /> Create Post
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:inline text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
}
