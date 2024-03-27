// import { useState } from "react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import challengeCardTest from "../../assets/challengeCardTest.svg";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const Mypage = () => {
  // const [data, setData] = useState([]);
  // 실제로는 get으로 받아온 데이터의 길이(배열?)가 0일때
  // 로그인 할 때는 아예 마이페이지 접근조차 안 되는건지 물어보기(근데 아마 그러겠지...?? 주소가 :id인데...ㅎ

  const navigate = useNavigate();

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
    <MainLayout>
      <div className="w-full h-[calc(100vh-58px-80px)] flex flex-col px-5 justify-around pt-9 pb-20 overflow-y-scroll">
        <div className="space-y-4 flex flex-col ">
          <div className="pb-[33px]">
            <h1 className="font-semibold text-xl">오늘의 챌린지</h1>
            <p className="text-sm">#오챌완. 오늘도 챌린지 완료해요!</p>
          </div>
          {/* 데이터 없을 떄 */}
          {/* <div className="bg-primary-200 w-[335px] h-[154px] rounded-xl flex flex-col justify-center items-center space-y-4">
          <div className="text-body-m text-center text-[#464139]">
            <div>아직 오늘의 챌린지가 없어요.</div>
            <div>새로운 챌린지를 뽑으러 가볼까요?</div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-[10px] w-[147px] h-[40px]">
            챌린지 뽑기
          </button>
        </div> */}

          {/*  아래는 데이터 있을 때 (타이머 + 버튼 + 완료한 챌린지 이미지와 지금 진행중인 챌린지 카드 이미지) */}
          <div className="flex flex-row w-full justify-around items-center">
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
                      src="src/assets/icons/timerIcon.svg"
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
                onClick={() => navigate("/my-page/:id/is-challenge-done")}
              >
                #오챌완
              </button>
            </div>

            <img src={challengeCardTest} width={147} height={185} />
          </div>
        </div>
        {/**여기까지가 데이터 있을 때 프로그래스바 보여지는 곳*/}

        <h1 className="pt-[42px] pb-[25px]">완료한 챌린지</h1>
        {/* *아직 완료한 챌린지가 없을 때(데이터가 없을 때 */}
        {/* <div className="bg-primary-200 w-[335px] h-[154px] rounded-xl flex flex-col justify-center items-center">
        <div className="text-body-m text-[#464139]">
          아직 완료한 챌린지가 없어요.
        </div>
      </div> */}

        {/**완료한 챌린지가 있을 때(데이터가 있을 떄 */}
        <div className="grid grid-cols-2 gap-y-[34px] w-full gap-x-[27px]">
          <img src={challengeCardTest} width={147} height={185} alt="test1" />
          <img src={challengeCardTest} width={147} height={185} alt="test2" />
          <img src={challengeCardTest} width={147} height={185} alt="test3" />
          <img src={challengeCardTest} width={147} height={185} alt="test4" />
          <img src={challengeCardTest} width={147} height={185} alt="test5" />
          <img src={challengeCardTest} width={147} height={185} alt="test6" />
          <img src={challengeCardTest} width={147} height={185} alt="test7" />
          <img src={challengeCardTest} width={147} height={185} alt="test8" />
        </div>
      </div>
    </MainLayout>
  );

};

export default Mypage;
