import { useState, useRef, useEffect } from "react";

function Topbar({ user, setUser, setActivePage }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // 🔥 close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  setUser(null);
  localStorage.removeItem("user");
  setActivePage("login");
};

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-sm mb-6">

      <h2 className="text-lg font-semibold">Dashboard</h2>

      {/* RIGHT SIDE */}
      {user ? (
        <div className="relative" ref={menuRef}>

          {/* AVATAR */}
          <div
            onClick={() => setOpen(!open)}
            className="w-9 h-9 bg-green-100 text-green-600 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:scale-105 transition"
          >
            {user.email?.[0]?.toUpperCase()}
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-3 z-50 animate-fadeIn">

              <p className="text-sm text-gray-600 mb-2">
                {user.email}
              </p>

              <div className="border-t my-2"></div>

              <button
                onClick={() => alert("Profile editing coming soon")}
                className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 rounded-lg"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      ) : (
        <button
          onClick={() => setActivePage("login")}
          className="border px-4 py-2 rounded-lg"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Topbar;