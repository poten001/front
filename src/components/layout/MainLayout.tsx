import { ReactNode, useEffect } from "react";
import StatusBar from "../../assets/statusBar.svg?react";
import MyPageIcon from "../../assets/icons/mypage-icon.svg?react";
import SettingIcon from "../../assets/icons/setting-icon.svg?react";
import HomeIcon from "../../assets/icons/home-icon.svg?react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { splashScreenState } from "../../store/splashScreenState";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const setSplashScreen = useSetRecoilState(splashScreenState);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashScreen(() => false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <>
      <StatusBar className="bg-primary-500" />
      <div className="h-full w-[375px] bg-white flex flex-col justify-center items-center">
        {children}

        <div className="w-full h-[80px] shadow-tab flex relative items-center">
          <div className="absolute top-[-18px] left-1/2 transform -translate-x-1/2">
            <div
              className="flex justify-center items-center rounded-full bg-black w-[50px] h-[50px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <HomeIcon width={18} height={18} />
            </div>
          </div>

          <div className="flex w-full justify-between px-[53px] cursor-pointer">
            <div
              className="flex flex-col items-center
              "
              onClick={() => navigate("/my-page/:id")}
            >
              <MyPageIcon width={20} height={20} />
              <p className="text-body-s">마이페이지</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/setting")}
            >
              <SettingIcon width={20} height={20} />
              <p className="text-body-s">설정</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
