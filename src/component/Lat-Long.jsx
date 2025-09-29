import { useState, useEffect } from "react";

export default function WeatherInputs({ label = "Weather Parameters", onChange }) {
  const [inputs, setInputs] = useState({
    latitude: "",
    longitude: "",
    temperature: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...inputs, [name]: value };
    setInputs(updated);
    onChange?.(updated);
  };

  // Fetch current temperature whenever lat/lon changes
  useEffect(() => {
    const fetchCurrentTemp = async () => {
      const { latitude, longitude } = inputs;
      if (!latitude || !longitude) return;

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
        );
        const data = await res.json();

        // Get current hour temperature
        const currentHour = new Date().getHours();
        const temperature = data.hourly?.temperature_2m?.[currentHour] ?? "";

        setInputs((prev) => ({ ...prev, temperature }));
        onChange?.({ ...inputs, temperature }); // send updated data to parent
      } catch (err) {
        console.error("Error fetching temperature:", err);
      }
    };

    fetchCurrentTemp();
  }, [inputs.latitude, inputs.longitude]);

  return (
    <div className="w-full border border-[#ffffff29] rounded-lg mt-5 p-5 shadow-2xl">
      <h2 className="text-left text-2xl font-bold mb-3 text-white">{label}</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left text-white">
            Latitude <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="latitude"
            placeholder="Enter latitude..."
            value={inputs.latitude}
            onChange={handleChange}
            className="w-full border border-[#ffffff29] rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-100 text-white"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left text-white">
            Longitude <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="longitude"
            placeholder="Enter longitude..."
            value={inputs.longitude}
            onChange={handleChange}
            className="w-full border border-[#ffffff29] rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-100 text-white"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left text-white">
            Current Temperature (°C)
          </label>
          <input
            type="number"
            name="temperature"
            placeholder="Current temperature..."
            value={inputs.temperature}
            readOnly
            className="w-full border border-[#ffffff29] rounded p-2 bg-gray-800 text-white"
          />
        </div>
      </div>
    </div>
  );
}
