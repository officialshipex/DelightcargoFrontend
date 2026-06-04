import axios from "axios";
import Cookies from "js-cookie";

export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const url = error.config?.url || "";

      // Skip logging out for third-party courier credentials validation endpoints
      const isCourierAuth =
        url.includes("/getAuthToken") ||
        url.includes("/getToken") ||
        url.includes("/authorize") ||
        url.includes("/addCourier");

      if ((status === 403 || status === 401) && !isCourierAuth) {
        console.warn("Invalid or expired token. Logging out...");
        Cookies.remove("session");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}
