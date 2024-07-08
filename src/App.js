import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "07d56b6fe9e65e3fe340d169dda230ef";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const apiUrl = `${baseUrl}?q=${location}&units=imperial&appid=${apiKey}`;
      axios.get(apiUrl).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center text-white" style={{ backgroundImage: `url(${'/sunset.jpg'})` }}>
      <h1 className="text-4xl">
         Weather-App City 
      </h1>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter City Name"
          type="text"
          className="py-3 px-8 border text-black border-gray-400"
        />
      </div>
      {/* Rest of your JSX */}
      <div className="container">
        <div className="top">
          <div className="flex justify-center">
            <p>{data.name}</p>
          </div>
          <div className="w-full h-36 font-bold text-6xl flex justify-center">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="w-full h-16 flex justify-center text-3xl text-bold items-start">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="flex gap-6 justify-center font-bold sm:text-1xl text-2xl">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
