import { useState } from "react";

export default function GitUsername({ label = "GitHub Username", onChange }) {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
    onChange?.(e.target.value); // send value to parent if needed
  };

  return (
    <div className="w-full  border border-[#ffffff29] rounded-lg mt-5 p-5  shadow-2xl">
      <h2 className="text-left text-2xl font-bold mb-3 text-white">{label}</h2>
      <div className="weather-inputs flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-left text-white">GitHub Username <span className="text-red-600">*</span></label>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            className="w-full border border-[#ffffff29] rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-100 text-white"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
