import React, { useEffect, useRef } from "react";
import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/userDataState";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import DownArrowIcon from "../../assets/icons/downArrow.svg?react";
import TimerIcon from "../../assets/icons/timerIcon.svg?react";
import getCurrentDateTime from "../../utils/utils";
import axios from "axios";
import Cookies from "js-cookie";

const DoneChallenge = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);
  const divRef = useRef<HTMLDivElement>(null);
  const { currentYear, currentMonth, currentDate, currentHour, currentMinute } =
    getCurrentDateTime();
  const accessToken = Cookies.get("accessToken");
  const { id } = useParams();

  useEffect(() => {
    const detailChallengeHandler = async () => {
      await axios
        .get(`https://today-challenge.site/challenge/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          console.log("완료");
        });
    };

    detailChallengeHandler();
  }, []);

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

  const downloadNavigateHandler = () => {
    handleDownload();
    navigate("/");
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
          <h1>완료한 챌린지</h1>
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
        <div className="flex flex-col pt-[52px]  justify-center items-center gap-[14px]">
          <DownArrowIcon />
          <h2>{userData.expireTime}</h2>
          <div className="flex flex-row gap gap-1 items-center justify-center">
            <TimerIcon />
            <p className="body-s">{userData.completeTime}</p>
          </div>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default DoneChallenge;
