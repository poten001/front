import { Outlet } from "react-router-dom";
import SplashScreenLoading from "../../src/components/loader/SplashScreenLoading";

const Root = () => {
  // global layout
  // 공통되는 전역 레이아웃을 정의합니다

  return (
    <SplashScreenLoading>
      <Outlet />
    </SplashScreenLoading>
  );
};

export default Root;
