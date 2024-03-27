import { Outlet } from "react-router-dom";
import SplashScreenLoading from "../components/Loader/SplashScreenLoading";

const Root = () => {
  return (
    <SplashScreenLoading>
      <Outlet />
    </SplashScreenLoading>
  );
};

export default Root;
