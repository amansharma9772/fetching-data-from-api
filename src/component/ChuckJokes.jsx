import { useState } from "react";

export default function ChuckJokes({ label = "Chuck Norris Jokes", onChange }) {

    const [joke, setJoke] = useState("");
    
    const handleChange = (e) => {
        setJoke(e.target.value);
        onChange?.(e.target.value); // send value to parent if needed
    };

    return (
        <div className="w-full border border-[#ffffff29] rounded-lg mt-5 p-5 shadow-2xl">
            <h2 className="text-left text-2xl font-bold mb-3 text-white">{label}</h2>
            <div className="jokes-inputs flex flex-col gap-3">
                <div className="flex flex-col">
                    <label className="mb-2 font-medium text-left text-white">
                        Joke <span className="text-red-600">*</span>
                    </label>
                    <p className="text-white text-md">
                        Chuck Norris jokes will appear in the result box after fetching.
                    </p>
                </div>
            </div>
        </div>
    );
}
