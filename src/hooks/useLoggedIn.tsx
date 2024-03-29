import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { loginState } from "../store/loginState";

const useLoggedIn = () => {
  // 카카오 로그인을 위한 커스텀 훅

  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return { login, setLogin };
};

export default useLoggedIn;
