import Logo from "../../assets/logo/logo.svg?react";
import CharactorOne from "../../assets/character/orange_girl.png";
import useModal from "../../hooks/useModal";
import ModalPortal from "../../components/modal/ModalTotal";
import Modal from "../../components/modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Notification from "../../assets/icons/notification.svg?react";
import SimpleSlider from "../../components/carousel/Carousel";
import { categoryState } from "../../store/categoryState";
import { userDataState } from "../../store/userDataState";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../../axios/axios";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import roulette from "../../assets/roulette.gif";

function Main() {
  const { modal, openModalHandler, closeModalHandler } = useModal();
  const category = useRecoilValue(categoryState);
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);
  const [challengeLoading, setChallengeLoading] = useRecoilState(
    challengeLoadingState
  );

  const accessToken = Cookies.get("accessToken");

  const drawChallenge = async (accessToken, body) => {
    const response = await instance.post(
      "https://today-challenge.site/challenge/draw",
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  };

  const { mutate: drawChallengeMutation } = useMutation({
    mutationFn: () => drawChallenge(accessToken, { category: category }),
    onSuccess: (data) => {
      const {
        memberName,
        memberProfile,
        startTime,
        expireTime,
        challengeTitle,
        challengeImg,
      } = data;
      setUserData({
        memberName,
        memberProfile,
        startTime,
        expireTime,
        challengeTitle,
        challengeImg,
        completeTime: "",
        takenTime: "",
      });

      setTimeout(() => {
        setChallengeLoading(false); // 로딩 상태 변경
        navigate("/create-challenge"); // 페이지 이동
      }, 3000); //
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data === "이미 도전 중인 챌린지가 있습니다.") {
        closeModalHandler();
        setChallengeLoading(false);
        navigate("/my-page");
      } else {
        console.log("err", error);
        setChallengeLoading(false);
        navigate("/error");
      }
    },
    onSettled: () => {},
  });
  const confirmHandler = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    if (category !== "") {
      setChallengeLoading(true);
      closeModalHandler();
      drawChallengeMutation(); // mutate 함수를 직접 사용합니다.
    }
  };

  return (
    <MainLayout color={challengeLoading ? "white" : "primary-500"}>
      {challengeLoading ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white ">
          <img src={roulette} alt="roulette" width={161} height={232} />
          <div className="pt-[34px] text-center">
            <h1>{`${userData.memberName} 님의 챌린지를`}</h1>
            <h1>뽑고 있어요</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-primary-500 w-full ">
          <div className="flex w-full flex-row justify-between px-[36px] pt-[19px]">
            <Logo className="w-[67px] h-auto" />
            <Notification />
          </div>

          <div className="flex flex-row items-center gap-[25px] pt-[38px] pb-[32px]">
            <img
              src={CharactorOne}
              alt="main-page"
              className="max-w-[107px] h-[96px]"
            />
            <div>
              <h1>오늘 도전할</h1>
              <h1>
                <span className="text-secondary-600">챌린지</span>를 뽑아보세요!
              </h1>
            </div>
          </div>
          <section className="flex flex-col justify-center items-center w-full h-full bg-white rounded-tl-[28px] rounded-tr-[28px] gap-[48px] pt-[42px] pb-[32px] overflow-x-hidden">
            <SimpleSlider />
            <button
              className="px-[125px] py-[15px] bg-secondary-500 rounded-xl text-white"
              onClick={openModalHandler}
            >
              챌린지 뽑기
            </button>
            {modal && (
              <ModalPortal>
                <Modal
                  onConfirm={confirmHandler}
                  onCancel={closeModalHandler}
                  showCancelBtn={true}
                  title={category}
                  subTitle="이 주제의 챌린지를 뽑아볼까요?"
                />
              </ModalPortal>
            )}
          </section>
        </div>
      )}
    </MainLayout>
  );
}

export default Main;
