import StatusBarLayout from "../../components/layout/StatusBarLayout";
import testImg from "../../assets/challengeImg_test.svg";
import getCurrentDateTime from "../../utils/utils";
import { useRecoilState } from "recoil";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useEffect } from "react";
import Roulette from "../../assets/roulette.svg?react";
import { useNavigate } from "react-router-dom";

const CreateChallengePage = () => {
  const { currentYear, currentMonth, currentDate, currentHour, currentMinute } =
    getCurrentDateTime();
  const [challengeLoading, setChallengeLoading] = useRecoilState(
    challengeLoadingState
  );
  const navigate = useNavigate();

  const mainApi = async () => {
    setChallengeLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    try {
      // 시뮬레이션을 위한 임시 promise 함수
      const simulateFetch = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: "fake data" }); // 2초 후에 가짜 데이터 반환
          }, 2000);
        });
      };

      const response = await simulateFetch();

      console.log("mainData", response);
      setChallengeLoading(false); // api 호출 완료 됐을 때 false로 변경하여 로딩화면 숨김처리
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  return (
    <StatusBarLayout
      color="white"
      showButton={challengeLoading ? false : true}
      leftBtnText="취소"
      rightBtnText="도전하기"
      leftBtnClick={() => navigate("/")}
      rightBtnClick={() => navigate("/my-page")}
    >
      <div className="flex flex-col justify-center items-center h-[calc(100vh-58px-34px)] w-full">
        {challengeLoading ? (
          <div className="  text-center">
            <Roulette />
            <div className="pt-[34px]">
              <h1>챌린저 님의 챌린지를</h1>
              <h1>뽑고 있어요</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5 pt-[57px] text-center">
              <h1>오늘의 챌린지를 뽑았어요</h1>
              <p className="text-body-m">24시간 내에 도전하고 #오챌완!</p>
            </div>
            <div className="pt-12 pb-[80px] relative">
              <img src={testImg} alt="test" className="w-[305px] h-[385px]" />
              {/* 프로필 사진 */}
              <div className="absolute left-[30px] top-[80px] flex">
                <img
                  src={testImg} // 여기서는 예시로 testImg를 사용했습니다. 실제 프로필 사진 경로로 변경해야 합니다.
                  alt="profile"
                  className=" w-[34px] h-[34px] rounded-full"
                />
                {/* 닉네임과 시간을 포함하는 컨테이너 */}
                <div className="">
                  <h3 className="font-semibold ">챌린져</h3>
                  <p className="text-body-s text-[#4B4B4B]">{`${currentYear}년 ${currentMonth}월 ${currentDate}일 ${currentHour}:${currentMinute}`}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </StatusBarLayout>
  );
};

export default CreateChallengePage;
