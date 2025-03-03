/**
 * ApiRoutes class
 */
export default class ApiRoutes {
  static BASE_URL_DEV: string = "https://localhost:3000/";
  static BASE_URL: string = "https://template";
  // Api route to login
  static LoginAdminUser: string = "api/auth/login";
  // Api route to fetch user users
  static FetchUsers: string = "https://jsonplaceholder.typicode.com/users";

  // Api route to fetch user profile
  static FetchUserProfile: string = "api/auth/profile";
}
