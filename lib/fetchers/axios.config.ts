import { env } from "@/enviroments";
import axios from "axios";

export const tmdbConfig = () => {
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
  return manager;
}




