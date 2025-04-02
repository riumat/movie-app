import { env } from "@/enviroments";
import axios, { AxiosInstance } from "axios";

export const tmdbConfig = (): AxiosInstance => {
  const manager = axios.create({
    baseURL: env.tmdbUrl,
  });
  manager.interceptors.request.use(
    (request) => {
      request.params = {
        ...request.params,
        api_key: env.tmdbKey,
      };
      return request;
    },
    (error) => Promise.reject(error)
  );

  manager.interceptors.response.use(
    (response) => {
      //console.log(`Response from URL: ${response.config.url} - Type: ${typeof response.data}`);
      return response;
    },
    (error) => Promise.reject(error)
  );

  return manager;
}




