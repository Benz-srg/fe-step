import axios, {
  AxiosError,
  AxiosInstance,
  //   AxiosRequestConfig,
  AxiosResponse,
} from "axios";
// import jwtDecode from "jwt-decode";
// import dayjs from "dayjs";

export interface Jwt {
  exp: number;
  expRefresh: number;
  id: string;
  otp_last_request: string;
  otp_status: boolean;
  prefix: string;
  status: number;
}

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: false,
});
axiosInstance.interceptors.request.use(async (config: any) => {
  // if (config.headers.Authorization) {
  //   try {
  //     const token: Jwt = jwtDecode(config.headers.Authorization);
  //     const currentTimestamp = dayjs();
  //     const expiredTimestamp = dayjs(token.expRefresh * 1000);

  //     const timeUntilExpiration = expiredTimestamp.diff(
  //       currentTimestamp,
  //       "minutes"
  //     );

  //     if (
  //       (timeUntilExpiration <= 30 && timeUntilExpiration > 0) ||
  //       timeUntilExpiration <= 0
  //     ) {
  //       const refresh_token = await refreshToken(config.headers.Authorization);
  //       if (refresh_token) {
  //         localStorage.setItem("zaa888", refresh_token);
  //         config.headers.Authorization = refresh_token;
  //       }
  //     }
  //   } catch (error) {}
  // }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status: number = error.response?.status || 0;
    console.error(error);
    if ([401, 403].includes(status)) {
      localStorage.removeItem("authStore");
      window.location.href = "/";
      // const token = localStorage.getItem("zaa888");
      // if (token) {
      //   return;
      // }
    }

    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

const refreshToken = async (token: string) => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/users/refresh",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export default axiosInstance;
