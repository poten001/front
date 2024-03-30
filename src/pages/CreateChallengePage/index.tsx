import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { userDataState } from "../../store/userDataState";
import roulette from "../../assets/roulette.gif";
import useModal from "../../hooks/useModal";
import ModalPortal from "../../components/modal/ModalTotal";
import Modal from "../../components/modal/Modal";
import useLoggedIn from "../../hooks/useLoggedIn";
import { categoryState } from "../../store/categoryState";

const CreateChallengePage = () => {
  const [challengeLoading, setChallengeLoading] = useRecoilState(
    challengeLoadingState
  );

  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);
  const accessToken = Cookies.get("accessToken");
  const { login } = useLoggedIn();
  const category = useRecoilValue(categoryState);
  const date = new Date(userData.startTime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const { modal, setModal, closeModalHandler } = useModal();

  const mainApi = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    setChallengeLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    const body = { category: category };
    console.log("body", body);
    try {
      if (!accessToken) {
        navigate("/login");
        return;
      }

      await axios
        .post("https://today-challenge.site/challenge/draw", body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setTimeout(() => {
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
          }, 3000);
        });
    } catch (err) {
      console.log("err", err);
      navigate("/error");
    }
  };

  useEffect(() => {
    mainApi();
  }, [login]);

  const modalHandler = () => {
    setModal((prev) => !prev);
    tryChallengeHandler();
  };

  const tryChallengeHandler = async () => {
    try {
      if (!accessToken) {
        navigate("/login");
        return;
      }

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
      rightBtnClick={modalHandler}
      /**모달 보이긴 하는데 너무 짧게 보이고 위치가 이상함 수정 필요 */
    >
      <div className="flex flex-col justify-center items-center h-[calc(100vh-58px-34px)] w-full">
        {challengeLoading ? (
          <div className="text-center">
            <img src={roulette} alt="roulette" width={161} height={232} />
            <div className="pt-[34px]">
              <h1>{`${userData.memberName} 님의 챌린지를`}</h1>
              <h1>뽑고 있어요</h1>
            </div>
          </div>
        ) : (
          <>
            {modal && (
              <ModalPortal>
                <Modal
                  onConfirm={tryChallengeHandler}
                  onCancel={closeModalHandler}
                  showCancelBtn={true}
                  title="이 챌린지에 도전하시겠어요?"
                />
              </ModalPortal>
            )}
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

              <div className="body-l absolute bottom-[120px] w-full left-0 right-0 m-auto text-center text-nowrap break-words">
                {userData.challengeTitle}
              </div>
            </div>
          </>
        )}
      </div>
    </StatusBarLayout>
  );
};

export default CreateChallengePage;
