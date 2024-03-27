import { Outlet } from "react-router-dom";
import SplashScreenLoading from "../components/loader/SplashScreenLoading";

const Root = () => {
  return (
    // <SplashScreenLoading>
    <Outlet />
    // </SplashScreenLoading>
  );
};

export default Root;
