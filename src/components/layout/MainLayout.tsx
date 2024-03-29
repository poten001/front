import MyPageIcon from "../../assets/icons/mypage-icon.svg?react";
import SettingIcon from "../../assets/icons/setting-icon.svg?react";
import HomeIcon from "../../assets/icons/home-icon.svg?react";
import { useRecoilValue } from "recoil";
import { splashScreenState } from "../../store/splashScreenState";
import { useLocation, useNavigate } from "react-router-dom";

type MainPageLayoutT = {
  children: React.ReactNode;
  color?: string;
};

const MainLayout = ({ children, color = "primary-500" }: MainPageLayoutT) => {
  const SplashScreen = useRecoilValue(splashScreenState);

  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지에 따라 아이콘 색상을 결정하는 함수
  const getIconColor = (page: string) => {
    return location.pathname.includes(page) ? "#FBE587" : "white";
  };

  return (
    <div className="h-full w-[375px] bg-white flex flex-col justify-center items-center">
      {!SplashScreen && <div className={`bg-${color} w-full h-[58px]`}></div>}

      {children}

      {!SplashScreen && (
        <div className="w-full h-[80px] shadow-tab flex relative items-center">
          <div className="absolute top-[-18px] left-1/2 transform -translate-x-1/2">
            <div
              className="flex justify-center items-center rounded-full bg-black w-[50px] h-[50px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <HomeIcon width={18} height={18} />
            </div>
          </div>

          <div className="flex w-full justify-between px-[53px] cursor-pointer pb-[30px] pt-[10px]">
            <div
              className="flex flex-col items-center
            "
              onClick={() => navigate("/my-page")}
            >
              <MyPageIcon
                width={20}
                height={20}
                fill={getIconColor("my-page")}
              />
              <p className="body-s">마이페이지</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/setting")}
            >
              <SettingIcon
                width={20}
                height={20}
                fill={getIconColor("setting")}
              />
              <p className="body-s">설정</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
