// store/completedChallengeState.js
import { atom } from "recoil";

interface Challenge {
  id: number;
  memberName: string;
  memberProfile: string;
  startTime: string;
  completeTime: string;
  takenTime: string;
  challengeTitle: string;
  challengeImg: string;
}

export const completedChallengeState = atom<Challenge[]>({
  key: "completedChallengeState", // 고유한 key
  default: [], // 기본값
});
