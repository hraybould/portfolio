import { BaseApi } from "BaseApi";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "./model";

export class WeatherApi extends BaseApi {
  /**
   * Get Weather Data from near me
   */
  public static getWeatherNearMe = async () => {
    try {
      const url = "https://api.open-meteo.com/v1/forecast";
      const params = {
        latitude: 52.48,
        longitude: -1.9,
        timezone: "auto",
        // timeformat: "unixtime",
        // hourly: "temperature_2m,weathercode",
        daily: "sunrise,sunset",
        current_weather: true,
      };
      const response = await this.makeRequest<ErrorResponse | SuccessResponse>({
        url,
        method: "GET",
        config: { params },
      });
      if (response.data) {
        // Return Success response
        return this.sucessResponse<SuccessResponse>(
          response.data as SuccessResponse
        );
      }
      throw new Error(this.unknownError);
    } catch (err) {
      // Handle Thrown Error
      if (typeof err === "string") {
        return this.errorResponse(err);
      }
      // Handle Axios Error
      const error = err as AxiosError<ErrorResponse>;
      return this.errorResponse(
        error.response ? error.response.data.reason : this.unknownError
      );
    }
  };
}
