import { atom } from "recoil";

export const userDataState = atom({
  key: "userDataState",
  default: {
    memberName: "",
    memberProfile: "",
    startTime: "",
    expireTime: null,
    challengeTitle: "",
    challengeImg: "",
    completeTime: "",
    takenTime: "",
  },
});
