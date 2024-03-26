import { useRouteError } from "react-router-dom";

type ErrorPageT = {
  data: string;
  status: number;
  statusText: string;
};

const ErrorPage = () => {
  const error = useRouteError() as ErrorPageT;
  console.log("error", error);

  return (
    <div>
      <div>{error.data}</div>
      <div>{error.status}</div>
      <div>{error.statusText}</div>
    </div>
  );
};

export default ErrorPage;
