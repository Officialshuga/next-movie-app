import { ApiResponse, AxiosErrorType } from "@/types";
import { AxiosRequestConfig } from "axios";
import getInstance from "./axios";
import { MovieResponse } from "@/types";


const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const axiosInstance = getInstance();

  try {
    const response = await axiosInstance.get<T>(url, config);
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosErrorType;
    const status = error.response?.status;
    const details = error.response?.data;

    return { 
        error:{
            message: `Failed to Fetch Data from ${url}`,
            status,
            details,
            name: " ",
        }
     };
  }
};


export const getMovie = async(
    endpoint: string,
):Promise<ApiResponse<MovieResponse>> => {
    const config: AxiosRequestConfig = {
        params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
            sort_by: "vote_average.desc",
            page: 1,
        }
    };
    return await getRequest <MovieResponse>(endpoint, config);
}




