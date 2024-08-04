import React from "react";

const Topbar = ({setQuery}) => {
  const cities = [
    {
      id: 1,
      name: "Srinagar",
    },
    {
      id: 2,
      name: "Jeddah",
    },
    {
      id: 3,
      name: "Manchester",
    },
    {
      id: 4,
      name: "London",
    },
  ];
  return (
    <div className="flex items-center justify-around sm:my-6 flex-wrap">
      {cities.map((city) => (
        <button key={city.id} className="sm:text-lg text-md font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in sm:text-center sm:mb-2" onClick={()=> setQuery({q: city.name})}>
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default Topbar;
