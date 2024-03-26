import Logo from "../../assets/logo/logo.svg?react";
import CharactorOne from "../../assets/character/orange_girl.png";
const SplashScreen = () => {
  return (
    <div className="w-full h-full bg-primary-500 flex flex-col justify-center items-center gap-[2%]">
      <img src={CharactorOne} alt="splashScreen" width={100} height={100} />
      <Logo className="w-[32%] h-auto" />
    </div>
  );
};

export default SplashScreen;
