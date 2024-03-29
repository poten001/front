import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../axios/axios";
import Cookies from "js-cookie";
const KakaoAuth = () => {
  // 인가코드 받아서 보내기

  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const body = {
      authorizationCode: code,
    };
    console.log("body", body);

    const postKakaoCode = async () => {
      try {
        await instance
          .post("https://today-challenge.site/auth/login", body)
          .then((response) => {
            console.log("response", response);

            const { accessToken, refreshToken } = response.data;
            console.log("response.data", response.data);
            Cookies.set("accessToken", accessToken);
            Cookies.set("refreshToken", refreshToken);
            navigate("/");
          });
      } catch (error) {
        console.log("error", error);
        navigate("/error");
      }
    };
    postKakaoCode();
  }, []);

  return <div>Kakao-auth 로그인 중</div>;
};

export default KakaoAuth;
