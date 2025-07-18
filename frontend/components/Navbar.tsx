import React, { useState, useRef, useEffect } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddPlayer = async () => {
    if (!name ) return alert("name feild is required!");

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${url}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, imgUrl }),
      });

      if (res.ok) {
        setName("");
        setImgUrl("");
        setShowDropdown(false);
      } else {
        alert("Failed to add player");
      }
    } catch (err) {
      console.error("Error adding player:", err);
    }
  };

  return (
    <div className="w-full bg-slate-800 h-16 px-3 sm:h-24 flex items-center justify-between sm:px-6 shadow-lg border-b-2 border-blue-500">
      {/* Left */}
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full"></div>
        </div>
        <h1 className="text-white text-xl sm:text-2xl font-bold">Point Arena</h1>
      </div>

      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 sm:px-6 sm:py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <p className="text-xs sm:text-xl"> + Add Player</p>
        </button>

        {/* Dropdown panel */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 sm:w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-2 sm:p-4 z-50">
            <h2 className="text-md font-semibold mb-3 text-gray-800">Add New Player</h2>
            <input
              type="text"
              placeholder="Player Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-600 text-sm px-3 py-1 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlayer}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
