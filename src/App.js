import "./App.css";
import Input from "./components/input/Input";
import TimeAndLocation from "./components/timeandlocation/TimeAndLocation";
import Topbar from "./components/topbar/Topbar";
import TempAndDetails from "./components/details/TempAndDetails";
import Forecast from "./components/forecast/Forecast";
import getFormattedWeatherData from "./services/weatherservice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [query, setQuery] = useState({ q: "srinagar" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    const message = query.q ? query.q : 'Current Location'
    toast.info(`Fetching Weather Details For ${message.toUpperCase()}`)
    await getFormattedWeatherData({ ...query, units}).then((data) => {
      toast.success(`Weather Data Fetched Successfully for ${data.name}, ${data.country}`)
      setWeather(data);
    });
  };
  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if(!weather) return "from-cyan-400 to-blue-700";
    const threshold = units === "metric" ? 20 : 80;
    if (weather.temp <= threshold) return ' from-cyan-600 to-blue-400';
    return 'from-yellow-500 to-orange-600'
  }

  return (
    <div className={`mx-auto max-w-screen-xl sm:mt-4 py-5 sm:px-32 px-5 bg-gradient-to-br shadow-xl shadow-gray-600 ${formatBackground()}`}>
      <Topbar setQuery={setQuery}/>
      <Input setQuery={setQuery} setUnits={setUnits}/>
      {weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TempAndDetails weather={weather} units={units}/>
          <Forecast title='3 Hour Forecast' data={weather.hourly}/>
          <Forecast title='Daily Forecast' data={weather.daily}/>
        </>
      )}
      <ToastContainer  autoClose={900} hideProgressBar={false} theme='colored'/>
    </div>
  );
}

export default App;
