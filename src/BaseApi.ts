import axios, { AxiosRequestConfig } from "axios";

type MakeRequestArgs = {
  url: string;
  method: "GET" | "POST";
  payload?: Record<any, any>;
  config?: AxiosRequestConfig;
};

type ApiResponse<D, E> = {
  data: D | null;
  errors: E | null;
  success: boolean;
};

export class BaseApi {
  /**
   *
   * @param args.url URL to make the request to
   * @param args.method Method to make the request with
   * @values `"GET"` | `"POST"`
   * @param args.payload Request payload for POST reuests
   * @param args.config Request config, used for query string parameters
   * @returns
   */
  public static unknownError = "An unknown error occurred";

  public static makeRequest = async <T>({
    url,
    method,
    payload,
    config,
  }: MakeRequestArgs) => {
    if (method === "POST") {
      return await axios.post<T>(url, payload, config);
    }
    if (payload && method === "GET") {
      console.warn(
        `GET requests (url: "${url}") cannot carry a payload. Send params in config instead`
      );
    }
    return await axios.get<T>(url, config);
  };

  public static sucessResponse = <T>(responseData: T): ApiResponse<T, null> => {
    return {
      success: true,
      data: responseData,
      errors: null,
    };
  };

  public static errorResponse = <E>(errorData: E): ApiResponse<null, E> => {
    return {
      success: false,
      data: null,
      errors: errorData,
    };
  };
}
