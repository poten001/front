import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "../store/userDataState";

function useRemainingTime() {
  const userData = useRecoilValue(userDataState);
  const [remainTime, setRemainTime] = useState("");
  const [remainingTimePercent, setRemainingTimePercent] = useState(100); // 백분율을 저장할 상태

  useEffect(() => {
    if (!userData.expireTime || !userData.startTime) {
      // startTime과 expireTime 중 하나라도 유효하지 않은 경우 처리
      console.error("expireTime or startTime is not valid.");
      return;
    }

    const start = new Date(userData.startTime).getTime();
    const expire = new Date(userData.expireTime).getTime();
    const totalDuration = expire - start; // 전체 기간 (밀리초)

    const updateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - start; // 현재까지 경과된 시간
      const remaining = expire - currentTime; // 남은 시간

      if (remaining <= 0) {
        // 만료되었을 경우
        setRemainTime("00시간 00분 00초");
        setRemainingTimePercent(0);
        return;
      }

      // 밀리초를 시, 분, 초로 변환합니다.
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      // 남은 시간을 "00시간 00분 00초" 형식으로 설정합니다.
      const formattedTime = `${hours.toString().padStart(2, "0")}시간 ${minutes
        .toString()
        .padStart(2, "0")}분 ${seconds.toString().padStart(2, "0")}초`;

      setRemainTime(formattedTime);

      const remainingPercent = (remaining / totalDuration) * 100;
      setRemainingTimePercent(Math.floor(remainingPercent));
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [userData]);

  // 남은 시간과 남은 시간의 백분율을 객체로 반환
  return { remainTime, remainingTimePercent };
}

export default useRemainingTime;
