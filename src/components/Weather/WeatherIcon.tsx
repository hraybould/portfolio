import { isAfter } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { TimeoutRef } from "topLevelModels";
import { SuccessResponse, WEATHER_CODES } from "./model";
import { WeatherApi } from "./WeatherApi";

export const WeatherIcon: React.FC = () => {
  // Timeout
  const timeout = useRef<TimeoutRef>(null);
  const [shouldReload, setShouldReload] = useState<boolean>(true);
  // State for if the data has been loaded
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  //
  const [weatherData, setWeatherData] = useState<ParsedWeatherData>({
    isNight: false,
    temperature: 0,
    weathercode: 0,
  });

  // Refresh the data on a timeout, every 100s at the moment
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setShouldReload(true);
    }, 100000);
  }, []);

  // Get the Weather data
  useEffect(() => {
    const getData = async () => {
      const weatherData = await WeatherApi.getWeatherNearMe();
      if (weatherData.data && !weatherData.errors) {
        setDataLoaded(true);
        setWeatherData(parseWeatherData(weatherData.data));
        setShouldReload(false);
      }
    };
    if (shouldReload) {
      getData();
    }
  }, [shouldReload]);

  const weatherCode = WEATHER_CODES[weatherData.weathercode];
  if (dataLoaded && weatherCode) {
    console.log(weatherData);
    // Select correct icon
    const iconString = weatherData.isNight ? "nightIcon" : "dayIcon";
    return weatherCode[iconString]({
      title: `The weather near me: ${weatherCode.title}`,
      size: 30,
      className: "WeatherData",
    });
  }
  return null;
};

// Helpers

type ParsedWeatherData = {
  isNight: boolean;
  temperature: SuccessResponse["current_weather"]["temperature"];
  weathercode: SuccessResponse["current_weather"]["weathercode"];
};

/**
 * Parse the Sunrise or Sunset data into a standard Date format
 */
const parseSunriseSunset = (
  sunriseSunset:
    | SuccessResponse["daily"]["sunrise"][number]
    | SuccessResponse["daily"]["sunset"][number]
): Date =>
  new Date(
    typeof sunriseSunset === "number" ? sunriseSunset * 1000 : sunriseSunset
  );

/**
 * Parse the Weather Data to extract the data I want to use
 */
const parseWeatherData = (weatherData: SuccessResponse): ParsedWeatherData => {
  const parsedSunrise = parseSunriseSunset(weatherData.daily.sunrise[0]);
  const parsedSunset = parseSunriseSunset(weatherData.daily.sunset[0]);
  const currentDate = new Date();
  const isNight =
    isAfter(currentDate, parsedSunrise) && isAfter(currentDate, parsedSunset);

  return {
    isNight,
    temperature: weatherData.current_weather.temperature,
    weathercode: weatherData.current_weather.weathercode,
  };
};
