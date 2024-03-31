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
    if (location.pathname === "/terms-of-service") {
      setDatas(termsOfServiceData);
    } else if (location.pathname === "/private-policy") {
      setDatas(privatePolicyData);
    }
  }, [location.pathname]);

  return (
    <MainLayout color="white">
      <SettingPageLayout>
        <div className="flex flex-col text-left gap-4">
          {datas.map((data) => (
            <div key={data.id} className="flex flex-col">
              <h3 className="font-semibold">{data.title}</h3>
              <p className="body-m leading-5 text-neutral-600">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </SettingPageLayout>
    </MainLayout>
  );
};

export default AboutOchaelWanPage;
