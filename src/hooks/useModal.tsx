import { useRecoilState } from "recoil";
import { modalState } from "../store/modalState";

const useModal = () => {
  // modal 상태 관련 커스텀 훅
  const [modal, setModal] = useRecoilState(modalState);

  const openModalHandler = () => {
    setModal(() => true);
  };

  const closeModalHandler = () => {
    setModal(() => false);
  };

  return { modal, setModal, openModalHandler, closeModalHandler };
};

export default useModal;
