import { useState } from "react";

export default function MultiSelect({ label, options, onChange }) {
  const [selected, setSelected] = useState([]);

  const handleChange = (value) => {
    let updated = [...selected];
    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated.push(value);
    }
    setSelected(updated);
    onChange?.(updated); // send selected values to parent if needed
  };

  return (
    <div className="w-full">
      {label && (
        <h2 className="text-left text-2xl font-bold mb-3 text-white">{label}</h2>
      )}
      <div className="multiselect flex items-center justify-between lg:justify-normal flex-wrap gap-3 lg:gap-4">
        {options.map((option, idx) => (
          <label
            key={idx}
            className="w-full md:w-[49%] lg:w-75 text-left flex flex-wrap  items-center cursor-pointer text-white text-[18px] font-semibold border border-[#ffffff29] p-2 rounded-md"
          >
            <input
              type="checkbox"
              className="me-2 accent-blue-500"
              checked={selected.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />

             <span className="mr-2">{option.icon}</span>
            {option.label}
            {option.description && (
              <p className="ml-6 text-sm text-gray-300 pt-2 leading-6 w-full">{option.description}</p>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
