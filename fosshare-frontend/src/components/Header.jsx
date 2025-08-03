import { Home, Bell, Search, Menu, X, Plus } from "lucide-react";
import { useEffect,useRef, useState } from "react";
import Select from "react-select";
import CreateFossPostModal from "./CreateFossPostModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Cargar tags desde el backend
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${apiUrl}/api/tags/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error al cargar tags:", err));
  }, []);

  // Manejar selección de tags
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Enviar el post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      content,
      tags: selectedTags,
    };

    try {
      const response = await fetch(`${apiUrl}/api/posts/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post creado:", data);
        setShowModal(false);
        setTitle("");
        setContent("");
        setSelectedTags([]);
        // Puedes recargar el feed aquí si lo necesitas
      } else {
        const errorData = await response.json();
        console.error("Error al crear post:", errorData);
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/user/profile/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data:", data);
        setUserData(data);
      })
      .catch((err) => {
        console.error("Error al obtener el perfil del usuario:", err);
      });
  }, []);

  return (
    <header className="bg-[#1B1D27] text-white px-4 md:px-6 py-4 flex items-center justify-between border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl text-orange-500">
        <span>🦊</span>
        <span className="text-white hidden sm:inline">FOSShare</span>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 mx-6 max-w-xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-sm text-white placeholder-gray-400 py-2 pl-10 pr-4 rounded-md focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Desktop nav + user */}
      <div className="hidden md:flex items-center gap-4">
        <NavButton
          icon={<Plus size={20} />}
          onClick={() => setShowModal(true)}
        />
        <NavButton icon={<Bell size={20} />} />

        {userData ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={userData.profile_picture}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:inline text-sm font-medium">
                {userData.full_name} ▾
              </span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-black text-black rounded shadow-lg z-50">
                <button className="block w-full text-white text-left px-4 py-2 hover:bg-gray-700 focus:outline-none focus:ring-0 border-none">
                  My posts
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/";
                  }}
                  className="block w-full text-white text-left px-4 py-2 hover:bg-gray-700 focus:outline-none focus:ring-0 border-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#1B1D27] border-t border-gray-700 md:hidden z-50">
          <div className="flex flex-col px-4 py-3 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-sm text-white placeholder-gray-400 py-2 pl-10 pr-4 rounded-md focus:outline-none"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button className="flex items-center gap-2 text-sm hover:text-orange-400">
              <Home size={18} /> Home
            </button>
            <button className="flex items-center gap-2 text-sm hover:text-orange-400">
              <Bell size={18} /> Notifications
            </button>
            <div className="flex items-center gap-2 mt-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">John Doe</span>
            </div>
          </div>
        </div>
      )}
      <CreateFossPostModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
}

function NavButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:text-orange-400 transition-colors"
    >
      {icon}
    </button>
  );
}

