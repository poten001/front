import { useNavigate } from "react-router-dom";
import StatusBarLayout from "../../components/layout/StatusBarLayout";
import Loading from "../../assets/loading.svg?react";

const HavePage = () => {
  const navigate = useNavigate();
  return (
    <StatusBarLayout
      showButton={true}
      color="white"
      leftBtnText="메인으로"
      rightBtnText="마이페이지로"
      leftBtnClick={() => navigate("/")}
      rightBtnClick={() => navigate("/my-page")}
    >
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Loading />
        <div className="flex flex-col text-center pt-[20px]">
          <h3>이미 도전 중인 챌린지가 있습니다</h3>
          <h3>챌린지는 하루에 하나만 참여 가능합니다</h3>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default HavePage;
