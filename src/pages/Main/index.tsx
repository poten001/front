import Logo from "../../assets/logo/logo.svg?react";
import CharactorOne from "../../assets/character/orange_girl.png";
import useModal from "../../hooks/useModal";
import ModalPortal from "../../components/modal/ModalTotal";
import Modal from "../../components/modal/Modal";
import { useSetRecoilState } from "recoil";
import { challengeLoadingState } from "../../store/challengeLoadingState";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Notification from "../../assets/icons/notification.svg?react";
import SimpleSlider from "../../components/carousel/Carousel";

function Main() {
  const { modal, openModalHandler, closeModalHandler } = useModal();
  const setChallengeLoading = useSetRecoilState(challengeLoadingState);
  const navigate = useNavigate();

  const confirmHandler = () => {
    closeModalHandler();
    setChallengeLoading(true);
    navigate("/create-challenge");
  };

  return (
    <MainLayout>
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
                title="건강 챙기기"
                subTitle="이 주제의 챌린지를 뽑아볼까요?"
              />
            </ModalPortal>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

export default Main;
