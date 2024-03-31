import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { userDataState } from "../../store/userDataState";
import roulette from "../../assets/roulette.gif";
import useModal from "../../hooks/useModal";
import ModalPortal from "../../components/modal/ModalTotal";
import Modal from "../../components/modal/Modal";
import { categoryState } from "../../store/categoryState";
import { instance } from "../../axios/axios";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
// import { format } from "date-fns";
// import { ko } from "date-fns/locale";

const CreateChallengePage = () => {
  const challengeLoading = useRecoilValue(challengeLoadingState);

  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);
  const accessToken = Cookies.get("accessToken");
  const category = useRecoilValue(categoryState);

  const { modal, setModal, closeModalHandler } = useModal();

  // const drawChallenge = async (accessToken, body) => {
  //   const response = await instance.post(
  //     "https://today-challenge.site/challenge/draw",
  //     body,
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     }
  //   );
  //   return response.data;
  // };

  // const { mutate: drawChallengeMutation } = useMutation({
  //   mutationFn: () => drawChallenge(accessToken, { category: category }),
  //   onSuccess: (data) => {
  //     const {
  //       memberName,
  //       memberProfile,
  //       startTime,
  //       expireTime,
  //       challengeTitle,
  //       challengeImg,
  //     } = data;
  //     setUserData({
  //       memberName,
  //       memberProfile,
  //       startTime,
  //       expireTime,
  //       challengeTitle,
  //       challengeImg,
  //       completeTime: "",
  //       takenTime: "",
  //     });
  //     // console.log("startTime", userData.startTime);
  //   },
  //   onError: (error) => {
  //     const axiosError = error as AxiosError;
  //     if (axiosError.response?.data === "이미 도전 중인 챌린지가 있습니다.") {
  //       navigate("/my-page");
  //     } else {
  //       console.log("err", error);
  //       navigate("/error");
  //     }
  //     console.log("error", error);
  //   },
  //   onSettled: () => {
  //     setChallengeLoading(false);
  //   },
  // });

  useEffect(() => {
    if (!accessToken) {
      return navigate("/login");
    }
  }, []);

  // 도전하겠냐 말겠냐
  const tryChallengeHandler = async (accessToken) => {
    try {
      const response = await instance.post(
        "https://today-challenge.site/challenge/try",
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.data === "이미 도전 중인 챌린지가 있습니다.") {
        navigate("/my-page");
      } else {
        console.log("err", err);
        navigate("/error");
      }
    }
  };
  const mutation = useMutation({
    mutationFn: () => tryChallengeHandler(accessToken),
    onSuccess: () => navigate("/my-page"),
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data === "이미 도전 중인 챌린지가 있습니다.") {
        navigate("/my-page");
      } else {
        console.log("err", error);
        navigate("/error");
      }
    },
  });

  const modalHandler = () => {
    setModal((prev) => !prev);
    mutation.mutate();
  };

  const formattedDate = format(
    new Date(userData.startTime),
    "yyyy년 MM월 dd일 HH:mm",
    { locale: ko }
  );
  console.log("formattedDate", formattedDate);

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
                  onConfirm={() => tryChallengeHandler}
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
                className="w-[305px] h-[385px] shadow-xl overflow-hidden rounded-[10px]"
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
                  <p className="body-s text-gray-700">{formattedDate}</p>
                </div>
              </div>

              {/* 다운로드 아이콘 */}
              <div className="absolute top-20 right-8 ">
                <DownloadIcon width={30} height={30} />
              </div>
              <div className="body-l absolute bottom-[110px] w-full h-[50px] left-0 right-0 m-auto px-5 text-center text-wrap break-keep">
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
