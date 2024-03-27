import StatusBarLayout from "../../components/layout/StatusBarLayout";
import testImg from "../../assets/challengeImg_test.svg";
import { useNavigate } from "react-router-dom";
import getCurrentDateTime from "../../utils/utils";
import StampOne from "../../assets/stamp/stamp_1.svg?react";
import StampTwo from "../../assets/stamp/stamp_2.svg?react";
import StampThree from "../../assets/stamp/stamp_3.svg?react";
import StampFour from "../../assets/stamp/stamp_4.svg?react";
import Draggable from "react-draggable";
import { useRef } from "react";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

const IsChallengeDonePage = () => {
  const navigate = useNavigate();
  const { currentYear, currentMonth, currentDate, currentHour, currentMinute } =
    getCurrentDateTime();

  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const handleRightButtonClick = async () => {
    await handleDownload();
    navigate("/my-page/:id");
  };

  return (
    <StatusBarLayout
      color="white"
      showButton={true}
      leftBtnText="취소"
      rightBtnText="완료"
      leftBtnClick={() => navigate(-1)}
      rightBtnClick={handleRightButtonClick}
    >
      <div className="flex flex-col justify-center items-center h-[calc(100vh-58px-34px)] w-full overflow-y-scroll pb-[50px]">
        <div className="flex flex-col gap-1.5 pt-[37px] text-center">
          <h1>오늘의 챌린지를 완료하셨나요?</h1>
        </div>
        <div className="pt-[32px] relative" ref={divRef}>
          <img src={testImg} alt="test" className="w-[305px] h-[385px]" />
          <div className="absolute left-[30px] top-[68px] flex">
            <img
              src={testImg}
              alt="profile"
              className=" w-[34px] h-[34px] rounded-full"
            />

            <div className="">
              <h3 className="font-semibold ">챌린져</h3>
              <p className="text-body-s text-[#4B4B4B]">{`${currentYear}년 ${currentMonth}월 ${currentDate}일 ${currentHour}:${currentMinute}`}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start w-full items-center gap-1 px-[52px] pb-[8px]">
          <h3>STICKER ZONE</h3>
          <span className="text-body-s text-neutral-500">
            스티커를 잡아서 위로 끌어올려주세요.
          </span>
        </div>
        <div className="bg-primary-200 relative w-[265px] h-[80px] rounded-[10px] flex flex-row p-[16px] gap-[10px] justify-center items-center">
          <Draggable>
            <StampOne />
          </Draggable>
          <Draggable>
            <StampTwo />
          </Draggable>
          <Draggable>
            <StampThree />
          </Draggable>
          <Draggable>
            <StampFour />
          </Draggable>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default IsChallengeDonePage;
