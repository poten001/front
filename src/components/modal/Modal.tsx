type ModalT = {
  title: string;
  subTitle?: string;
  showCancelBtn?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
const Modal = ({
  title,
  subTitle,
  showCancelBtn,
  onConfirm,
  onCancel,
}: ModalT) => {
  return (
    <div className="fixed w-full h-full bg-[rgba(142,142,142,0.4)] z-20 top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[288px] h-[166px] z-30 rounded-xl">
        <div className="flex flex-col justify-center items-center py-8 px-[62.5px] gap-2">
          <div className="text-[17px] font-semibold">{title}</div>
          <div className="text-[13px] text-[#777777]">{subTitle}</div>
        </div>
        <div className="flex flex-row border-t border-[#E3E3E3] justify-around text-center">
          {showCancelBtn && (
            <button
              onClick={onCancel}
              className="flex justify-center items-center w-1/2 h-12 border-r text-[#777777] border-[#E3E3E3]"
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`flex justify-center items-center h-12 text-secondary-500 font-bold ${
              showCancelBtn ? "w-1/2" : "w-full"
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );

};

export default Modal;
