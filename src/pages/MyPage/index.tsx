import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Pin from "../../assets/icons/pin.svg?react";
import timerIcon from "../../assets/icons/timerIcon.svg";
import { useRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userDataState } from "../../store/userDataState";
import { completedChallengeState } from "../../store/completeChallengeState";

const Mypage = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const [userData, setUserData] = useRecoilState(userDataState);
  const [hasChallengeInProgress, setHasChallengeInProgress] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useRecoilState(
    completedChallengeState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inProgressChallengeUrl =
          "https://today-challenge.site/challenge/try/check";
        const completedChallengesUrl =
          "https://today-challenge.site/challenges";

        // 두 API 요청을 동시에 처리
        const [inProgressChallengeResponse, completedChallengesResponse] =
          await Promise.all([
            axios.get(inProgressChallengeUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            axios.get(completedChallengesUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
          ]);

        setUserData(inProgressChallengeResponse.data);
        setCompletedChallenge(completedChallengesResponse.data);
        setHasChallengeInProgress(true);
        console.log("inProgressChallengeResponse", inProgressChallengeResponse);
        console.log("completedChallengesResponse", completedChallengesResponse);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data === "도전 중인 챌린지가 없습니다.") {
          setHasChallengeInProgress(false);
        } else {
          console.error("API 요청 중 오류 발생:", error);
          console.log("error", error);
          navigate("/error");
        }
      }
    };
    fetchData();
  }, []);

  const handleChallengeDone = () => {
    navigate(`/is-challenge-done`);
  };

  const props = {
    percent: 70, // is require
    colorSlice: " #FF6740",
    colorCircle: "#FFC0B0",
    fontColor: "#365b74",
    fontSize: "10px",
    fontWeight: 400,
    size: 128,
    stroke: 10,
    strokeBottom: 10,
    speed: 60,
    cut: 0,
    rotation: -90,
    fill: "white",
    unit: "%",
    textPosition: "0.35em",
    animationOff: false,
    inverse: false,
    round: false,
    number: false,
  };

  return (
    <MainLayout color="white">
      <div className="w-full bg-white h-[calc(100vh-58px-80px)] flex flex-col px-5 justify-around pt-9 pb-20 overflow-y-scroll">
        <div className="space-y-4 flex flex-col ">
          <div className="pb-[33px]">
            <h1 className="font-semibold ">오늘의 챌린지</h1>
            <p className="body-m">#오챌완. 오늘도 챌린지 완료해요!</p>
          </div>

          {/* 데이터 없을 떄 */}
          {!hasChallengeInProgress && (
            <div className="bg-primary-200 w-[335px] h-[154px] rounded-xl flex flex-col justify-center items-center space-y-4">
              <div className="body-m text-center text-[#464139]">
                <div>아직 오늘의 챌린지가 없어요.</div>
                <div>새로운 챌린지를 뽑으러 가볼까요?</div>
              </div>
              <button
                onClick={() => navigate("/create-challenge")}
                className="px-4 py-2 bg-black cursor-pointer text-white rounded-[10px] w-[147px] h-[40px]"
              >
                챌린지 뽑기
              </button>
            </div>
          )}
          {hasChallengeInProgress && (
            <div className="flex flex-row w-full justify-around items-center">
              <div className="relative">
                <img
                  src={userData.challengeImg}
                  width={147}
                  height={185}
                  className="cursor-pointer"
                  onClick={() => navigate("/is-challenge-done")}
                />
                {/* // 챌린지 도전 항목이 있는지 체크하고 // 있다면
                is-challenge-done으로 이동 // 그리고 이동 후 보여지는 내용은
                어차피 userData에 ㅈㅓ장해놔서 그거 쓰면 됨 */}
                <Pin className="absolute top-0" />
              </div>
              <div className="flex flex-col gap-[17px]">
                <div className="flex relative justify-center items-center gap-7">
                  <CircularProgressBar {...props}>
                    <div
                      className="flex w-full flex-row justify-center items-center"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* SVG 이미지 */}
                      <img
                        src={timerIcon}
                        style={{
                          width: "8px",
                          height: "9px",
                          marginBottom: "13px",
                          marginRight: "72px", // 텍스트와의 간격 조정
                        }}
                        alt="타이머 아이콘"
                      />
                      {/* 첫 번째 텍스트 */}
                      <div
                        style={{
                          fontFamily: "Pretendard Variable",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "10px",
                          lineHeight: "15px",
                          textAlign: "center",
                          color: "#1F1F1F",
                          position: "absolute",
                          bottom: "10px", // 하단에서의 위치 조정
                          marginLeft: "4px",
                        }}
                      >
                        챌린지 종료까지
                      </div>

                      {/* 두 번째 텍스트 */}
                      <div
                        style={{
                          width: "100%",
                          fontFamily: "Pretendard Variable",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "10px",
                          lineHeight: "15px",
                          textAlign: "center",
                          color: "#FF6740",
                          position: "absolute",
                          top: "14px", // 첫 번째 텍스트와 상대적인 위치
                          left: "50%", // 부모 div 기준 가운데 정렬
                          transform: "translateX(-50%)", // 좌우 중앙 정렬을 위해 X축 기준으로 -50% 이동
                        }}
                      >
                        10시간 20분 30초
                      </div>
                    </div>
                  </CircularProgressBar>
                </div>
                <button
                  className="bg-black text-white rounded-[10px] w-[147px] h-[40px]"
                  onClick={handleChallengeDone}
                >
                  #오챌완
                </button>
              </div>
            </div>
          )}

          {/*  아래는 데이터 있을 때 (타이머 + 버튼 + 완료한 챌린지 이미지와 지금 진행중인 챌린지 카드 이미지) */}
        </div>
        {/**여기까지가 데이터 있을 때 프로그래스바 보여지는 곳*/}

        <h1 className="pt-[42px] pb-[25px]">완료한 챌린지</h1>

        {/* *아직 완료한 챌린지가 없을 때(데이터가 없을 때 */}

        {completedChallenge.length < 1 ? (
          <div className="bg-primary-200 w-[335px] h-[154px] rounded-xl flex flex-col justify-center items-center">
            <div className="body-m text-[#464139]">
              아직 완료한 챌린지가 없어요.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-[34px] w-full gap-x-[27px]">
            {completedChallenge.map((val) => (
              <img
                key={val.id}
                src={val.challengeImg}
                width={147}
                height={185}
                alt="completedImg"
                onClick={() => navigate(`/done-challenge/${val.id}`)}
                className="cursor-pointer"
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Mypage;
