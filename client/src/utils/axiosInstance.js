import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) =>   response,
  (error) => {
    let message = "something went wrong!";

    if (!window.navigator.onLine) {
      message = "Check your internet connection"

    }
    else if (!error.response) {
      message = "Server is down. Please try again later!";

    }
    else {
      message = error.response.data?.error || "Server Error!";

    }
    return Promise.reject(message);
  }
);

export default axiosInstance;