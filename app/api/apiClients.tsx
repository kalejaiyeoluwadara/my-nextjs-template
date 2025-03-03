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


export async function loginUser(data: { email: string; password: string }) {
  try {
    console.log(
      "Logging in with URL:",
      API.defaults.baseURL + ApiRoutes.LoginAdminUser
    );
    const response = await API.post(ApiRoutes.LoginAdminUser, data);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
