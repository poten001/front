import LoginImage from "../../assets/loginImage.svg?react";
import KaKaoIcon from "../../assets/icons/kakaoIcon.svg?react";
import StatusBar from "../../assets/statusBar.svg?react";

const LoginPage = () => {
  return (
    <div className="w-[375px] h-screen bg-white flex flex-col justify-center items-center ">
      <StatusBar className="bg-white" />
      <div className="text-center pt-[51px] pb-[61px]">
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
        <button className="flex flex-row gap-[15px] items-center bg-kakao-btn text-kakao-text px-[68px] py-[12.5px] rounded-[10px]">
          <KaKaoIcon />
          <span>카카오 계정으로 시작하기</span>
        </button>
        <p className="text-[#807E76] text-sm">다음에 할래요</p>
      </div>
    </div>
  );
};

export default LoginPage;
