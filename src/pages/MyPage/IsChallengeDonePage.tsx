import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useNavigate } from "react-router-dom";
import getCurrentDateTime from "../../utils/utils";
import { useRef } from "react";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import DownArrowIcon from "../../assets/icons/downArrow.svg?react";
import TimerIcon from "../../assets/icons/timerIcon.svg?react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/userDataState";

const IsChallengeDonePage = () => {
  const navigate = useNavigate();
  const { currentYear, currentMonth, currentDate, currentHour, currentMinute } =
    getCurrentDateTime();

  const divRef = useRef<HTMLDivElement>(null);
  const accessToken = Cookies.get("accessToken");

  const userData = useRecoilValue(userDataState);

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

  const downloadNavigateHandler = async () => {
    await axios
      .post("https://today-challenge.site/challenge/complete", null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        handleDownload();
        console.log("완료");
        navigate("/");
      });
  };

  return (
    <StatusBarLayout
      color="white"
      showButton={true}
      leftBtnText="취소"
      rightBtnText="완료"
      leftBtnClick={() => navigate(-1)}
      rightBtnClick={downloadNavigateHandler}
    >
      <div
        className="flex flex-col justify-center items-center h-[calc(100vh-58px-34px)] w-full overflow-y-scroll pb-[50px] "
        ref={divRef}
      >
        <div className="flex flex-col gap-1.5 pt-[37px] text-center">
          <h1>오늘의 챌린지를 완료하셨나요?</h1>
        </div>
        <div className="pt-[32px] relative">
          <img
            src={userData.challengeImg}
            alt="test"
            className="w-[305px] h-[385px]"
          />
          <div className="absolute left-[30px] top-[68px] flex">
            <img
              src={userData.memberProfile}
              alt="profile"
              className=" w-[34px] h-[34px] rounded-full"
            />

            <div className="">
              <h3 className="font-semibold ">{userData.memberName}</h3>
              <p className="body-s text-[#4B4B4B]">{`${currentYear}년 ${currentMonth}월 ${currentDate}일 ${currentHour}:${currentMinute}`}</p>
            </div>
          </div>
          <div className="absolute top-[64px] cursor-pointer right-8 ">
            <DownloadIcon
              width={30}
              height={30}
              onClick={downloadNavigateHandler}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-[14px]">
          <DownArrowIcon />
          <h2>{`21시 30분 만에 완료했어요`}</h2>
          <div className="flex flex-row gap gap-1 items-center justify-center">
            <TimerIcon />
            <p className="body-s">{userData.completeTime}</p>
          </div>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default IsChallengeDonePage;
