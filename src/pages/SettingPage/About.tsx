import { useLocation } from "react-router-dom";
import SettingPageLayout from "../../components/layout/SettingPageLayout";
import { aboutService, privacyPolicy, termsOfService } from "../../utils/data";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

const AboutOchaelWanPage = () => {
  const aboutData = aboutService;
  const termsOfServiceData = termsOfService;
  const privatePolicyData = privacyPolicy;

  const location = useLocation();
  const [datas, setDatas] = useState(aboutData);

  useEffect(() => {
    if (location.pathname === "/about-ochaelwan") {
      setDatas(aboutData);
    } else if (location.pathname === "/terms-of-service") {
      setDatas(termsOfServiceData);
    } else if (location.pathname === "/private-policy") {
      setDatas(privatePolicyData);
    }
  }, [location.pathname]);

  return (
    <MainLayout>
      <SettingPageLayout>
        <div>
          {datas.map((data) => (
            <div key={data.id} className="flex flex-col">
              <div>{data.title}</div>
              <div>{data.description}</div>
            </div>
          ))}
        </div>
      </SettingPageLayout>
    </MainLayout>
  );
};

export default AboutOchaelWanPage;
