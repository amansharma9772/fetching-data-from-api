

import './App.css'
import MultiSelect from './component/MultiSelect'
import GithubUsername from './component/GithubUsername'
import { useState } from 'react'
import FetchButton from './component/fetchbutton'
import CatFact from './component/CatFact'
import { FaGithub } from "react-icons/fa";
import { FaCloudMoonRain } from "react-icons/fa";
import { FaCat } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import WeatherInputs from './component/Lat-Long';
import ChuckJokes from './component/ChuckJokes'
import ClearCache from './component/ClearCache'
function App() {

  const [selectedApis, setSelectedApis] = useState([]);
  const [githubUsername, setGithubUsername] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [fact, setfact] = useState("");
  const [weatherParams, setWeatherParams] = useState({ latitude: "", longitude: "" });
  const [chuckJoke, setChuckJoke] = useState("");
  const [cache, setCache] = useState({});


  const apiOptions = [
    {
      label: "Weather", value: "weather", icon: <FaCloudMoonRain />,
      description: "Check current weather using latitude/longitude."
    },
    {
      label: "Github Username", value: "github", icon: <FaGithub />,
      description: "Fetch details about any GitHub user."
    },
    {
      label: "Cat Fact", value: "cat", icon: <FaCat />,
      description: "Get a random fun fact about cats."
    },
    {
      label: "Chuck Norris Jokes",
      value: "chuck",
      icon: <MdEmojiEmotions />,
      description: "Get a random funny Chuck Norris joke."
    },

  ];


const handleFetch = async () => {
  if (selectedApis.length === 0) return;
  setLoading(true);

  const tempResults = {};
  const promises = [];

  // Weather API
  if (selectedApis.includes("weather") && weatherParams.latitude && weatherParams.longitude) {
    const { latitude, longitude } = weatherParams;
    const start = performance.now(); // start timer
    const weatherPromise = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
      .then(res => res.json())
      .then(data => {
        const end = performance.now(); // end timer
        tempResults.weather = {
          data: data, 
          responseTime: Math.round(end - start) // calculate ms
        };
      });
    promises.push(weatherPromise);
  }

  // GitHub API
  if (selectedApis.includes("github") && githubUsername) {
    const start = performance.now();
    const githubPromise = fetch(`https://api.github.com/users/${githubUsername}`)
      .then(res => res.json())
      .then(data => {
        const end = performance.now();
        tempResults.github = {
          data: data,
          responseTime: Math.round(end - start)
        };
      });
    promises.push(githubPromise);
  }

  // Cat Fact API
  if (selectedApis.includes("cat")) {
    const start = performance.now();
    const catPromise = fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => {
        const end = performance.now();
        tempResults.cat = {
          data: data,
          responseTime: Math.round(end - start)
        };
      });
    promises.push(catPromise);
  }

  // Chuck Norris API
  if (selectedApis.includes("chuck")) {
    const start = performance.now();
    const chuckPromise = fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(data => {
        const end = performance.now();
        tempResults.chuck = {
          data: data,
          responseTime: Math.round(end - start)
        };
      });
    promises.push(chuckPromise);
  }

  try {
    await Promise.all(promises);
    setResults(tempResults);
  } catch (err) {
    console.error("Error fetching APIs:", err);
  } finally {
    setLoading(false);
  }
};





  const fetchData = async (api, url) => {
    const cacheKey = `${api}-${url}`;

    // If cached, use cache
    if (cache[cacheKey]) {
      setResults((prev) => ({
        ...prev,
        [api]: { data: cache[cacheKey].data, responseTime: cache[cacheKey].responseTime }
      }));
      return;
    }

    const startTime = performance.now(); // start timer
    const res = await fetch(url);
    const data = await res.json();
    const endTime = performance.now(); // end timer

    const responseTime = Math.round(endTime - startTime); // ms

    // Save in cache
    setCache((prev) => ({
      ...prev,
      [cacheKey]: { data, responseTime }
    }));

    setResults((prev) => ({
      ...prev,
      [api]: { data, responseTime }
    }));
  };

const handleClearCache = () => {
  setCache({}); // only clears cache
  // results state remains untouched
};

  return (
    <>
      <div className=' mx-auto   mt-10' >
        <div className='title flex flex-wrap justify-center  lg:justify-between gap-[22px] items-center  text-center mb-8 p-2 max-w-full '>
          <h1 className='capitalize text-2xl font-bold md:text-5xl text-white'>Fetching data from multiple APIs</h1>
          <ClearCache
            onClick={() => {
              setCache({});
              // setResults({});
            }}
          />

        </div>
        <div className='flex flex-wrap lg:flex-nowrap gap-3 '>
          <div className='max-w-full lg:max-w-xl border-[#ffffff29] p-2 border mx-2 rounded-md  mb-2'>
            <div className='multiselect border-[#ffffff29] rounded-lg border p-5  shadow-2xl m-2'>
              <MultiSelect label="Services APIs" options={apiOptions} onChange={(values) => setSelectedApis(values)} />
            </div>

            <div className='permaters border-[#ffffff29] rounded-lg border p-5 shadow-2xl m-2'>
              <h2 className='text-white text-2xl font-semibold'>Parameters</h2>

              {/* Check if no input APIs selected */}
              {selectedApis.length === 0 ? (
                <p className="text-white mt-3 p-2">
                  There has no checked box selected. Please select the checkbox.
                </p>
              ) : (
                <>
                  <div className='Weather m-2'>
                    {selectedApis.includes("weather") && (
                      <WeatherInputs onChange={(params) => setWeatherParams(params)} />
                    )}
                  </div>


                  <div className='Weather m-2'>
                    {selectedApis.includes("github") && (
                      <GithubUsername onChange={(username) => setGithubUsername(username)} />
                    )}
                  </div>

                  <div className='Weather m-2'>
                    {selectedApis.includes("cat") && (
                      <CatFact onChange={(fact) => setfact(fact)} />
                    )}
                  </div>

                  <div className='Weather m-2'>
                    {selectedApis.includes("chuck") && (
                      <ChuckJokes onChange={(joke) => setChuckJoke(joke)} />

                    )}
                  </div>

                </>
              )}
            </div>

            <div className='fetchbutton mt-5 p-2 border-[#ffffff29] rounded-lg border p-5 shadow-2xl m-2'>
              <FetchButton
                onClick={handleFetch}
                disabled={
                  selectedApis.length === 0 ||
                  (selectedApis.includes("github") && !githubUsername)
                }
                loading={loading}
              />

              <p className='text-white text-md text-center pt-2'>Select atleast one API service to continue</p>



            </div>


          </div>

          <div className='w-full mx-2 mb-5 rounded-lg'>

         {/* <div className='w-full me-2 rounded-lg'> */}
  <div className='border-[#ffffff29] p-3 border w-full me-2 rounded-md'>
    <div className='flex justify-between items-center'>
    <h2 className='text-white text-2xl'>Results</h2>
 <div className='bg-[#0e0026] border border-[#ffffff29] rounded-lg p-2 text-center  flex items-center justify-center hover:bg-[#1a003f] transition-colors duration-200'>
                <p className='text-white'>Cache count:<span> {Object.keys(cache).length}</span></p>
              </div>
              </div>
    {/* If no results, show default icon */}
    {Object.keys(results).length === 0 && (
      <div className="text-center items-center gap-3 text-gray-300 text-md pt-4">
        <MdElectricBolt className='mx-auto text-6xl text-gray-700'/>
        <p className='text-gray-400'>API response will appear here after you click "Fetch Data".</p>
      </div>
    )}

    {/* Render results dynamically */}
    {["cat", "github", "chuck", "weather"].map(api => 
      results[api] ? (
        <div 
          key={api} 
          className='p-4 rounded overflow-x-auto border border-[#ffffff29] my-2 hover:bg-[#1a003f] transition-colors duration-200'
        >
          {/* API Title + Response Time */}
          <div className='flex justify-between items-center mb-2'>
            <h3 className="text-lg font-semibold text-white">{api}</h3>
            <p className='text-white text-sm'>
              Response time: <span>{results[api]?.responseTime ?? 0} ms</span>
            </p>
          </div>

          {/* API JSON data */}
          <pre className="whitespace-pre-wrap text-sm md:text-base text-white">
            {JSON.stringify(results[api], null, 2)}
          </pre>
        </div>
      ) : null
    )}
  </div>
{/* </div> */}

           </div>
        </div>

      </div>


    </>
  );
}

export default App
