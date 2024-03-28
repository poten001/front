import LoginImage from "../../assets/loginImage.svg?react";
import KaKaoIcon from "../../assets/icons/kakaoIcon.svg?react";
// import StatusBar from "../../assets/statusBar.svg?react";
import StatusBarLayout from "../../components/layout/StatusBarLayout";

const LoginPage = () => {
  const REST_API_KEY = import.meta.env.NEXT_PUBLIC_KAKAO_LOGIN_REST_API_KEY;
  const REDIRECT_URL = import.meta.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const kakaoLoginHandler = () => {
    window.location.href = link;
  };

  return (
    <StatusBarLayout showButton={false} color="white">
      <div className="w-[375px] h-full bg-white flex flex-col justify-center items-center ">
        <div className="text-center pt-[51px] pb-[48px]">
          <h1>어서오세요 🤗</h1>
          <h1>오챌완 하기 좋은 날이네요!</h1>
        </div>
        <LoginImage className="aspect-auto" />

        <div className="flex flex-col text-center pt-[61px]">
          <h1>그렇다면 지금 오챌완에서</h1>
          <h1>
            <span>오늘의 계획</span>을 정해 드려요!
          </h1>
        </div>

        <div className="flex justify-center flex-col items-center gap-4 pt-[68px] pb-[24px]">
          <button
            className="flex flex-row gap-[15px] items-center bg-kakao-btn text-kakao-text px-[68px] py-[12.5px] rounded-[10px]"
            onClick={kakaoLoginHandler}
          >
            <KaKaoIcon />
            <span>카카오 계정으로 시작하기</span>
          </button>
          <p className="text-[#807E76] text-sm">다음에 할래요</p>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default LoginPage;
