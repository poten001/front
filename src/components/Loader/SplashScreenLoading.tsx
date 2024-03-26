import React, { useEffect } from "react";
import SplashScreen from "../../pages/Main/SplashScreen";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { splashScreenState } from "../../store/splashScreenState";

const SplashScreenLoading = ({ children }: { children: React.ReactNode }) => {
  const setSplashScreen = useSetRecoilState(splashScreenState);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashScreen(() => false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  const isSplashScreenActive = useRecoilValue(splashScreenState);
  return isSplashScreenActive ? <SplashScreen /> : children;
};

export default SplashScreenLoading;
