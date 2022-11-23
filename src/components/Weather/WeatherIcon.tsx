import { TABLET_BREAKPOINT } from "appHelpers";
import { Link } from "components/Link";
import { isAfter } from "date-fns";
import { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import { TimeoutRef } from "topLevelModels";
import useMedia from "use-media";
import { SuccessResponse, WEATHER_CODES } from "./model";
import { WeatherApi } from "./WeatherApi";

// TODO: Add link to https://open-meteo.com/

export const WeatherIcon: React.FC = () => {
  // Media Queries
  const largerThanTablet = useMedia({ minWidth: TABLET_BREAKPOINT });
  // Timeout
  const timeout = useRef<TimeoutRef>(null);
  const [shouldReload, setShouldReload] = useState<boolean>(true);
  // State for if the data has been loaded
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  // Parsed Weather Data state
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

    // Cleanup on unmount
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
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
    // Select correct icon
    const iconString = weatherData.isNight ? "nightIcon" : "dayIcon";
    return (
      <Popup
        trigger={
          <div className="DisplayFlex SmallGap CursorHelp">
            {largerThanTablet && <span>Weather near me:</span>}
            {weatherCode[iconString]({
              size: 30,
              className: "WeatherData",
            })}
          </div>
        }
        on={"hover"}
        position={["bottom center", "top center"]}
        repositionOnResize
        closeOnDocumentClick
      >
        <div>The weather near me is currently: {weatherCode.title}</div>
        <div className="SmallText">
          Meteorological data provided:{" "}
          <Link href="https://open-meteo.com/">Open Meteo</Link>
        </div>
      </Popup>
    );
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
