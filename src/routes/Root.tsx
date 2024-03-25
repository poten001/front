import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { Outlet } from "react-router-dom";

const Root = () => {
  // global layout
  // 공통되는 전역 레이아웃을 정의합니다

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Root;
