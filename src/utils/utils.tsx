import Cookies from "js-cookie";

const getCurrentDateTime = () => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줍니다.
  const currentDate = currentTime.getDate(); // 날짜를 얻기 위해 getDate를 사용합니다. getDay는 요일을 반환합니다.
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentSecond = currentTime.getSeconds();

  return {
    currentYear,
    currentMonth,
    currentDate,
    currentHour,
    currentMinute,
    currentSecond,
  };
};
export default getCurrentDateTime;

export const setCookie = (name: string, value: string) => {
  Cookies.set(`${name}, ${value}`);
};

export const getCookie = (name: string) => {
  Cookies.get(`${name}`);
};

export const removeCookie = (name: string) => {
  Cookies.remove(`${name}`);
};
