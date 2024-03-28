import StatusBarLayout from "../layout/StatusBarLayout";
import LoadingLogo from "../../assets/loading.svg?react";

const Loading = () => {
  return (
    <StatusBarLayout showButton={false} color="primary-500">
      <div className="bg-primary-500 w-full h-full justify-center items-center">
        <LoadingLogo />
      </div>
    </StatusBarLayout>
  );
};

export default Loading;
