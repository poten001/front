import Logo from "../../assets/logo/logo.svg?react";
import CharactorOne from "../../assets/character/orange_girl.png";

function Main() {
  return (
    <div className="flex flex-col justify-center items-center bg-primary-500 w-full ">
      <div className="flex w-full flex-row justify-between px-[36px] pt-[19px]">
        <Logo className="w-[67px] h-auto" />
        <p>알림</p>
      </div>

      <div className="flex flex-row items-center gap-[25px] pt-[38px] pb-[32px]">
        <img
          src={CharactorOne}
          alt="main-page"
          className="max-w-[107px] h-[96px]"
        />
        <div>
          <h1>오늘 도전할</h1>
          <h1>
            <span className="text-secondary-600">챌린지</span>를 뽑아보세요!
          </h1>
        </div>
      </div>
      <section className="flex flex-col justify-center items-center w-full h-full bg-white rounded-tl-[28px] rounded-tr-[28px] gap-[48px] pt-[63px] pb-[44px]">
        <div className="w-[220px] h-[266px] bg-primary-500 "></div>
        <button className="px-[125px] py-[15px] bg-secondary-500 rounded-xl text-white">
          챌린지 뽑기
        </button>
      </section>
    </div>
  );
}

export default Main;
