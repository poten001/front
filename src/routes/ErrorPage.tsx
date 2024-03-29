import StatusBarLayout from "../components/layout/StatusBarLayout";
import ErrorImage from "../assets/404.svg?react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <StatusBarLayout
      showButton={true}
      color="white"
      leftBtnText="이전으로"
      rightBtnText="메인으로"
      leftBtnClick={() => navigate(-1)}
      rightBtnClick={() => navigate("/")}
    >
      <div className="h-full w-full flex flex-col justify-center items-center">
        <ErrorImage />
        <div className="flex flex-col text-center pt-[20px]">
          <h3>죄송합니다</h3>
          <h3>요청하신 페이지를 찾을 수 없습니다.</h3>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default ErrorPage;
