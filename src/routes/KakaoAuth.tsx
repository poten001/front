import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { setCookie } from "../utils/utils";
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
        const response = await axios
          .post("https://today-challenge.site/auth/login", body)
          .then(() => {
            console.log("response", response);
            // const { accessToken, refreshToken } =
            // setCookie("accessToken", accessToken);
            // setCookie("refreshToken", refreshToken);
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
