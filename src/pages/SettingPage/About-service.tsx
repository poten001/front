import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import SettingPageLayout from "../../components/layout/SettingPageLayout";
import aboutServiceImg from "../../assets/about_ochaelwan.png";

const AboutService = () => {
  return (
    <MainLayout color="white">
      <SettingPageLayout>
        <div>
          <img src={aboutServiceImg} alt="about-service" />
        </div>
      </SettingPageLayout>
    </MainLayout>
  );
};

export default AboutService;
