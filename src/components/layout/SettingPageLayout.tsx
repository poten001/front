import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../assets/icons/backArrow.svg?react";
import { useEffect, useState } from "react";

const SettingPageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (location.pathname === "/about-ochaelwan") {
      setTitle(`#오챌완 소개`);
    } else if (location.pathname === "/terms-of-service") {
      setTitle("서비스 이용약관");
    } else if (location.pathname === "/private-policy") {
      setTitle("개인정보 처리방침");
    }
  }, [location.pathname]);

  const prevPageHandler = () => {
    return navigate(-1);
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <div className="flex w-full h-[45px] justify-center items-center py-[9px] border-b-[1px] border-neutral-400">
        <BackButton className="cursor-pointer" onClick={prevPageHandler} />
        <h2 className="px-[106px]">{title}</h2>
      </div>
      <div className=" px-5 py-8 h-[calc(100vh-58px-80px-45px)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default SettingPageLayout;
