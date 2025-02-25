import axios from "axios";
import ApiRoutes from "./apiRoutes";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL_DEV,
});

export const headerConfig = (token?: string) => {
  if (!token) {
    return {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    };
  }
};
