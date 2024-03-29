import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useRecoilState } from "recoil";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { userDataState } from "../../store/userDataState";
import roulette from "../../assets/roulette.gif";

const CreateChallengePage = () => {
  const [challengeLoading, setChallengeLoading] = useRecoilState(
    challengeLoadingState
  );
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);
  const accessToken = Cookies.get("accessToken");

  const mainApi = async () => {
    setChallengeLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기

    const body = { category: "랜덤" };
    console.log("body", body);
    try {
      setChallengeLoading(true);
      await axios
        .post("https://today-challenge.site/challenge/draw", body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setChallengeLoading(false);
          const {
            memberName,
            memberProfile,
            startTime,
            expireTime,
            challengeTitle,
            challengeImg,
          } = res.data;

          setUserData({
            memberName,
            memberProfile,
            startTime,
            expireTime,
            challengeTitle,
            challengeImg,
            completeTime: "",
          });
          console.log("res", res);
        });
    } catch (err) {
      console.log("err", err);
      navigate("/error");
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  const date = new Date(userData.startTime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const tryChallengeHandler = async () => {
    try {
      await axios
        .post("https://today-challenge.site/challenge/try", null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          navigate("/my-page");
        });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response?.data === "이미 도전 중인 챌린지가 있습니다." ||
        axiosError.response?.status === 409
      ) {
        navigate("/have-challenge");
      } else {
        console.log("err", err);
        navigate("/error");
      }
    }
  };

  return (
    <StatusBarLayout
      color="white"
      showButton={challengeLoading ? false : true}
      leftBtnText="취소"
      rightBtnText="도전하기"
      leftBtnClick={() => navigate("/")}
      rightBtnClick={tryChallengeHandler}
    >
      <div className="flex flex-col justify-center items-center h-[calc(100vh-58px-34px)] w-full">
        {challengeLoading ? (
          <div className="  text-center">
            <img src={roulette} alt="roulette" />
            <div className="pt-[34px]">
              <h1>{`${userData.memberName} 님의 챌린지를`}</h1>
              <h1>뽑고 있어요</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5 pt-[57px] text-center">
              <h1>오늘의 챌린지를 뽑았어요</h1>
              <p className="body-m">24시간 내에 도전하고 #오챌완!</p>
            </div>

            <div className="pt-12 pb-20 relative">
              {/* 주 이미지 */}
              <img
                src={userData.challengeImg}
                alt="challengeImg"
                className="w-[305px] h-[385px]"
              />

              {/* 프로필 사진과 텍스트를 묶은 컨테이너 */}
              <div className="absolute flex items-center gap-2 left-[30px] top-[80px]">
                <img
                  src={userData.memberProfile}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{userData.memberName}</h3>
                  <p className="body-s text-gray-700">{`${year}년 ${month}월 ${day}일 ${hours}:${minutes}`}</p>
                </div>
              </div>

              {/* 다운로드 아이콘 */}
              <div className="absolute top-20 right-8 ">
                <DownloadIcon width={30} height={30} />
              </div>
            </div>
          </>
        )}
      </div>
    </StatusBarLayout>
  );
};

export default CreateChallengePage;
