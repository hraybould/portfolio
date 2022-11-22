import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltPartlyCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiDayFog,
  WiFog,
  WiNightFog,
  WiDaySprinkle,
  WiSprinkle,
  WiNightAltSprinkle,
  WiDayRain,
  WiNightAltRain,
  WiDayRainWind,
  WiNightAltRainWind,
  WiRainMix,
  WiNightAltRainMix,
  WiDaySnow,
  WiNightAltSnow,
  WiSleet,
  WiNightAltSleet,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDaySnowThunderstorm,
  WiNightAltSnowThunderstorm,
} from "react-icons/wi";

type WeatherInformation = {
  title: string;
  dayIcon: React.FC;
  nightIcon: React.FC;
};
type WeatherCodeData = Partial<Record<number, WeatherInformation>>;

// `getWeatherNearMe` Response Types
export type ErrorResponse = { reason: string; error: true };
// NOTE: all time data is in Unix Seconds
// time: "iso8601";
// temperature_2m: "°C"
export type SuccessResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    sunrise: string;
    sunset: string;
    time: string;
  };
  daily: {
    sunrise: (string | number)[];
    sunset: (string | number)[];
    time: (string | number)[];
  };
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: keyof WeatherCodeData;
    time: number;
  };
};

export const WEATHER_CODES: WeatherCodeData = {
  // Clear
  0: {
    title: "Clear sky",
    dayIcon: WiDaySunny,
    nightIcon: WiNightClear,
  },
  // Simple Codes
  1: {
    title: "Mainly clear",
    dayIcon: WiDayCloudy,
    nightIcon: WiNightAltPartlyCloudy,
  },
  2: {
    title: "partly cloudy",
    dayIcon: WiDayCloudy,
    nightIcon: WiNightAltCloudy,
  },
  3: {
    title: "Overcast",
    dayIcon: WiCloudy,
    nightIcon: WiCloudy,
  },
  // Fog
  45: {
    title: "Fog",
    dayIcon: WiDayFog,
    nightIcon: WiNightFog,
  },
  48: {
    title: "Depositing rime fog",
    dayIcon: WiFog,
    nightIcon: WiNightFog,
  },
  // Drizzle
  51: {
    title: "Light drizzle",
    dayIcon: WiDaySprinkle,
    nightIcon: WiNightAltSprinkle,
  },
  53: {
    title: "Moderate drizzle",
    dayIcon: WiDaySprinkle,
    nightIcon: WiNightAltSprinkle,
  },
  55: {
    title: "Dense drizzle",
    dayIcon: WiDaySprinkle,
    nightIcon: WiNightAltSprinkle,
  },
  // Freezing Drizzle
  56: {
    title: "Light freezing drizzle",
    dayIcon: WiSprinkle,
    nightIcon: WiNightAltSprinkle,
  },
  57: {
    title: "Dense freezing drizzle",
    dayIcon: WiSprinkle,
    nightIcon: WiNightAltSprinkle,
  },
  // Rain
  61: {
    title: "Slight rain",
    dayIcon: WiDayRain,
    nightIcon: WiNightAltRain,
  },
  63: {
    title: "Moderate rain",
    dayIcon: WiDayRain,
    nightIcon: WiNightAltRain,
  },
  65: {
    title: "Heavy rain",
    dayIcon: WiDayRainWind,
    nightIcon: WiNightAltRainWind,
  },
  // Freezing Rain
  66: {
    title: "Light freezing rain",
    dayIcon: WiRainMix,
    nightIcon: WiNightAltRainMix,
  },
  67: {
    title: "Heavy freezing rain",
    dayIcon: WiRainMix,
    nightIcon: WiNightAltRainMix,
  },
  // Snowfall
  71: {
    title: "Slight snowfall",
    dayIcon: WiDaySnow,
    nightIcon: WiNightAltSnow,
  },
  73: {
    title: "Moderate snowfall",
    dayIcon: WiDaySnow,
    nightIcon: WiNightAltSnow,
  },
  75: {
    title: "Heavy snowfall",
    dayIcon: WiDaySnow,
    nightIcon: WiNightAltSnow,
  },
  // Snow
  77: {
    title: "Snow grains",
    dayIcon: WiDaySnow,
    nightIcon: WiNightAltSnow,
  },
  // Rain Showers
  80: {
    title: "Slight Rain showers",
    dayIcon: WiDayRain,
    nightIcon: WiNightAltRain,
  },
  81: {
    title: "Moderate Rain showers",
    dayIcon: WiDayRain,
    nightIcon: WiNightAltRain,
  },
  82: {
    title: "Violent Rain showers",
    dayIcon: WiDayRainWind,
    nightIcon: WiNightAltRainWind,
  },
  // Snow showers
  85: {
    title: "Slight snow showers",
    dayIcon: WiSleet,
    nightIcon: WiNightAltSleet,
  },
  86: {
    title: "Heavy snow showers",
    dayIcon: WiSleet,
    nightIcon: WiNightAltSleet,
  },
  // Thunderstorms
  95: {
    title: "Slight or Moderate Thunderstorm",
    dayIcon: WiDayThunderstorm,
    nightIcon: WiNightAltThunderstorm,
  },
  // Thunderstorms with Hail
  96: {
    title: "Thunderstorm with slight hail",
    dayIcon: WiDaySnowThunderstorm,
    nightIcon: WiNightAltSnowThunderstorm,
  },
  99: {
    title: "Thunderstorm with heavy hail",
    dayIcon: WiDaySnowThunderstorm,
    nightIcon: WiNightAltSnowThunderstorm,
  },
};
