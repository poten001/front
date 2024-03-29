import axios from "axios";
// import { getCookie, setCookie } from "../utils/utils";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
});

instance.interceptors.request.use(
  async (config) => {
    let accessToken: string | null = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken && refreshToken) {
      try {
        // 리프레시 토큰을 Bearer 토큰 없이 URL 파라미터로 전송
        const response = await axios.post(
          `https://today-challenge.site/auth/refresh`,
          {},
          {
            params: {
              refreshToken: refreshToken,
            },
          }
        );

        accessToken = response.data.accessToken;

        Cookies.set("accessToken", accessToken);

        // 새로운 엑세스 토큰으로 현재 요청의 헤더 설정
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("엑세스 토큰 재발급 실패", error);
      }
    } else if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
