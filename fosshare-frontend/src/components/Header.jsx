import { Home, Bell, Search, Menu, X } from "lucide-react";
import { useEffect,useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("Header component montado");
  
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
    console.log("Intentando llamar a:", `${apiUrl}/api/user/profile/`);
    console.log("Token:", localStorage.getItem("authToken"));
    
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
        <NavButton icon={<Home size={20} />} />
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
              <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/";
                  }}
                  className="block w-full text-white text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
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
    </header>
  );
}

function NavButton({ icon }) {
  return (
    <button className="hover:text-orange-400 transition-colors">{icon}</button>
  );
}
