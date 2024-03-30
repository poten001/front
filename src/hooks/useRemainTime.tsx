import { useState, useEffect } from "react";
// Recoil 상태 관리 라이브러리에서 useRecoilValue 훅을 가져옵니다.
import { useRecoilValue } from "recoil";
// 전역 상태인 userDataState를 가져옵니다.
import { userDataState } from "../store/userDataState";

function useRemainingTime() {
  // useRecoilValue 훅을 사용하여 Recoil 전역 상태인 userData를 가져옵니다.
  const userData = useRecoilValue(userDataState);

  // 남은 시간을 저장할 상태입니다.
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (!userData.expireTime) {
      // expireTime이 유효하지 않은 경우의 처리
      // 예: 오류 메시지를 표시하거나, 기본값을 설정
      console.error("expireTime is not valid.");
      return;
    }

    const expire = new Date(userData.expireTime);
    // 남은 시간을 실시간으로 업데이트하기 위한 함수
    const updateRemainingTime = () => {
      const currentTime = new Date();
      // getTime() 메소드를 사용하여 밀리초 단위의 숫자로 변환 후 연산
      const timeDiff = expire.getTime() - currentTime.getTime();

      if (timeDiff <= 0) {
        // 만료되었을 경우
        setRemainingTime("00시간 00분 00초");
        return;
      }

      // 밀리초를 시, 분, 초로 변환합니다.
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // 남은 시간을 "00시간 00분 00초" 형식으로 설정합니다.
      const formattedTime = `${hours.toString().padStart(2, "0")}시간 ${minutes
        .toString()
        .padStart(2, "0")}분 ${seconds.toString().padStart(2, "0")}초`;

      setRemainingTime(formattedTime);
    };

    // 컴포넌트 마운트 시 한 번과 매 초마다 남은 시간 업데이트
    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    // 클린업 함수에서 인터벌을 제거합니다.
    return () => clearInterval(intervalId);
  }, [userData]); // userData가 변경될 때마다 이 effect를 다시 실행합니다.

  return remainingTime;
}

export default useRemainingTime;
