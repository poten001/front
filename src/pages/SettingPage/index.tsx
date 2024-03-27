import PencilIcon from "../../assets/icons/pencil.svg?react";
import KakaoIconTwo from "../../assets/icons/kakaoIconTwo.svg?react";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import SettingPageWaveBg from "../../assets/settingPageBg.svg?react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex w-full flex-col bg-white">
        <div className="w-full h-[322px] flex flex-col bg-primary-500 justify-center items-center gap-4 pt-[50px] relative">
          <div className="bg-white rounded-full w-[100px] h-[100px]"></div>
          <div className="flex flex-row gap-2 items-center justify-center z-10">
            <h2>닉네임</h2>
            <PencilIcon width={14} height={14} />
          </div>
          <div className="flex flex-row items-center gap-2 z-10">
            <KakaoIconTwo width={18} height={18} />
            <span className="text-neutral-700">{`challenge@kakao.com`}</span>
          </div>
          {/* <div className="absolute top-0 left-0 w-full"> */}
          <SettingPageWaveBg className="absolute top-[-190px] left-0 w-full " />
          {/* </div> */}
        </div>
        <div className="w-full h-full flex flex-col text-left gap-[25px] px-5 pb-[40px] pt-[55px]">
          <div className="flex flex-col gap-[15px]">
            <p>서비스 소개</p>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/about-ochaelwan")}
            >
              <p>#오챌완 소개</p>
              <ArrowIcon />
            </div>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/terms-of-service")}
            >
              <p>서비스 이용약관</p>
              <ArrowIcon />
            </div>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/private-policy")}
            >
              <p>개인정보 처리방침</p>
              <ArrowIcon />
            </div>
          </div>

          <div className="flex flex-col gap-[15px]">
            <p>회원</p>
            <p>로그아웃</p>
            <p>서비스 탈퇴</p>
          </div>
        </div>
      </div>
    </MainLayout>

  );
};

export default SettingPage;
