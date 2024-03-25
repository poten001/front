import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-[400px] bg-white flex justify-center items-center">
      {children}
    </div>
  );
};

export default MainLayout;
