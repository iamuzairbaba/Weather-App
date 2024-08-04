import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center my-6">
      <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          type="text"
          placeholder="Search City Name"
          className="text-gray-500 text-base sm:text-lg font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase w-full sm:w-3/4"
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="flex flex-row space-x-4">
          <BiSearch
            size={30}
            className="cursor-pointer transition ease-out hover:scale-110 sm:w-6 sm:h-6 w-5 h-5"
            onClick={handleSearch}
          />
          <BiCurrentLocation
            size={30}
            className="cursor-pointer transition ease-out hover:scale-110 sm:w-6 sm:h-6 w-5 h-5"
            onClick={handleLocationClick}
          />
        </div>
      </div>
      <div className="flex flex-row w-full sm:w-1/4 items-center justify-center mt-4 sm:mt-0">
        <button
          className="text-base sm:text-lg font-medium transition ease-out hover:scale-110"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="mx-1 font-medium text-base sm:text-lg">|</p>
        <button
          className="text-base sm:text-lg font-medium transition ease-out hover:scale-110"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Input;
