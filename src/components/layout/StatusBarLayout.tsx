import StatusBar from "../../assets/statusBar.svg?react";

type statusBarT = {
  children: React.ReactNode;
  color: string;
  leftBtnText?: string;
  rightBtnText?: string;
  showButton: boolean;
  leftBtnClick?: () => void;
  rightBtnClick?: () => void;
};

const StatusBarLayout = ({
  children,
  color,
  leftBtnText,
  rightBtnText,
  showButton,
  leftBtnClick,
  rightBtnClick,
}: statusBarT) => {
  return (
    <div className="h-screen w-[375px] box-border bg-white flex flex-col justify-center items-center  ">
      <StatusBar className={`bg-${color}`} />
      {children}

      {showButton ? (
        <div className="flex flex-row gap-[10px] px-[20px] pb-[34px]">
          <button
            className="rounded-xl w-[162.5px] h-[52px] text-secondary-500 bg-secondary-200"
            onClick={leftBtnClick}
          >
            {leftBtnText}
          </button>
          <button
            className="rounded-xl w-[162.5px] h-[52px] text-white bg-secondary-500 "
            onClick={rightBtnClick}
          >
            {rightBtnText}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default StatusBarLayout;
