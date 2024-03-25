import React from "react";

const KakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY;
  const REDIRECT_URL = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const kakaoLoginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className="border bg-red-400 p-3 text-white"
      onClick={kakaoLoginHandler}
    >
      카카오
    </button>
  );
};

export default KakaoLogin;
