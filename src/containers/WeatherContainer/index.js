import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import WeatherCard from "./WeatherCard";
import * as dayjs from "dayjs";
import { API_KEY } from "../config.js";

const kelvinToC = (kTemp) => {
  return (kTemp - 273.15).toFixed(0);
};

const sliced = (data) => Array.from(data).slice(0, 5);
// Unessasary, can do in normalizeData function

const unixToDate = (data) => dayjs.unix(data).format("ddd");

// Move these above functions into a utils folder

export default function WeatherContainer() {
  const [isLoading, setIsLoading] = useState({});
  const [apiData, setApiData] = useState({});

  const lat = "49.2827"; // Could make this dynamic
  const long = "-123.1207";

  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`; // Move to config in src, for constants to be used anywhere

  useEffect(() => {
    fetch(apiUrl) // Move fetch into fetchData, async function for more reusable code
      .then((res) => res.json())
      .then((data) => {
        // Transform the data here
        const normalizedData = sliced(data.daily);
        // Set the data into setAPI
        setApiData(normalizedData);
        return normalizedData;
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  const WeatherItems = () => {
    return apiData.map((item) => (
      <WeatherCard
        maxTemp={kelvinToC(item.temp.max)} // Normalize this data before passing to the weatherCard
        minTemp={kelvinToC(item.temp.min)}
        icon={item.weather[0].icon}
        date={unixToDate(item.dt)}
      />
    ));
  };

  return (
    // Add sx stlyings to seperate file/folder
    <Box sx={{ display: "flex" }}>
      {isLoading ? <Loader /> : <WeatherItems />}
    </Box>
  );
}
