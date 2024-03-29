import Logo from "../../assets/logo/logo.svg?react";
import CharactorOne from "../../assets/character/orange_girl.png";
import useModal from "../../hooks/useModal";
import ModalPortal from "../../components/modal/ModalTotal";
import Modal from "../../components/modal/Modal";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Notification from "../../assets/icons/notification.svg?react";
import SimpleSlider from "../../components/carousel/Carousel";
import { categoryState } from "../../store/categoryState";

function Main() {
  const { modal, openModalHandler, closeModalHandler } = useModal();
  const category = useRecoilValue(categoryState);
  const navigate = useNavigate();

  const confirmHandler = async () => {
    // 빈 값이라면
    // 카테고리 선택해라 쨔샤라는 모달이나 알림창

    // 카테고리 값이 빈 값이 아니라면
    // 모달 닫고
    // 챌린지 페이지로 이동시킨다
    // 그러면 챌린지 페이지가 렌더링 될 때 챌린지 로딩화면이 데이터 받아올 때까지 (true)상태
    // 보이고 다 보여지면 다시 false가 되어서 원래 보이고자 하는 콘텐츠가 보인다
    // 그러면 카테고리는 전역상태, 뽑은 챌린지 내용, 이미지, 유저사진, 날짜도 하나로 묶어 전역으로 관리해야함(그래야 디테일 페이지에서 보여줄 수 있음)

    if (category !== "") {
      closeModalHandler();
      navigate("/create-challenge");
    }
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
                title={category}
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
