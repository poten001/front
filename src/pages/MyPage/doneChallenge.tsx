import React, { useEffect, useRef, useState } from "react";
import StatusBarLayout from "../../components/layout/StatusBarLayout";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import DownloadIcon from "../../assets/icons/downloadIcon.svg?react";
import DownArrowIcon from "../../assets/icons/downArrow.svg?react";
import TimerIcon from "../../assets/icons/timerIcon.svg?react";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const DoneChallenge = () => {
  const navigate = useNavigate();

  const divRef = useRef<HTMLDivElement>(null);
  const accessToken = Cookies.get("accessToken");
  const { id } = useParams();
  const [detailData, setDetailData] = useState({
    id: "",
    memberName: "",
    memberProfile: "",
    startTime: "",
    completeTime: "",
    takenTime: "",
    challengeTitle: "",
    challengeImg: "",
  });

  useEffect(() => {
    const detailChallengeHandler = async () => {
      await axios
        .get(`https://today-challenge.site/challenge/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          console.log("res.data doneChallenge", res.data);
          setDetailData(res.data);
        });
    };

    detailChallengeHandler();
  }, [id, accessToken]);

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

  const formattedDate = detailData.startTime
    ? format(new Date(detailData.startTime), "yyyy년 MM월 dd일 HH:mm", {
        locale: ko,
      })
    : "시작 시간 없음";

  const formattedCompleteDate = detailData.completeTime
    ? format(new Date(detailData.completeTime), "yyyy년 MM월 dd일 HH:mm", {
        locale: ko,
      })
    : "완료 시간 없음";

  console.log("formattedDate", formattedDate);
  console.log("formattedCompleteDate", formattedCompleteDate);
  return (
    <StatusBarLayout
      color="white"
      showButton={true}
      leftBtnText="취소"
      rightBtnText="저장하기"
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
            src={detailData.challengeImg}
            alt="test"
            className="w-[305px] h-[385px] rounded-xl shadow-xl"
          />
          <div className="absolute left-[30px] top-[68px] flex">
            <img
              src={detailData.memberProfile}
              alt="profile"
              className=" w-[34px] h-[34px] rounded-full"
            />

            <div className="">
              <h3 className="font-semibold ">{detailData.memberName}</h3>
              <p className="body-s text-[#4B4B4B]">{formattedDate}</p>
            </div>
          </div>
          <div className="absolute top-[64px] cursor-pointer right-8 ">
            <DownloadIcon
              width={30}
              height={30}
              onClick={downloadNavigateHandler}
            />
          </div>
          <div className="body-l absolute bottom-[30px] px-5 w-full  h-[50px] left-0 right-0 m-auto text-center text-wrap break-keep">
            {detailData.challengeTitle}
          </div>
        </div>
        <div className="flex flex-col pt-[52px]  justify-center items-center gap-[14px]">
          <DownArrowIcon />
          <h2>{detailData.takenTime}</h2>
          <div className="flex flex-row gap gap-1 items-center justify-center">
            <TimerIcon />
            <p className="body-m text-neutral-500">{formattedCompleteDate}</p>
          </div>
        </div>
      </div>
    </StatusBarLayout>
  );
};

export default DoneChallenge;
