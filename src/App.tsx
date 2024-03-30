import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import AboutOchaelWanPage from "./pages/SettingPage/About";
import CreateChallengePage from "./pages/CreateChallengePage";
import Mypage from "./pages/MyPage";
import IsChallengeDonePage from "./pages/MyPage/IsChallengeDonePage";
import KakaoAuth from "./routes/KakaoAuth";
import DoneChallenge from "./pages/MyPage/doneChallenge";
import HavePage from "./pages/CreateChallengePage/havePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/setting",
          element: <SettingPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/about-ochaelwan",
          element: <AboutOchaelWanPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/terms-of-service",
          element: <AboutOchaelWanPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/private-policy",
          element: <AboutOchaelWanPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/my-page",
          element: <Mypage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "is-challenge-done",
          element: <IsChallengeDonePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/create-challenge",
          element: <CreateChallengePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/done-challenge/:id",
          element: <DoneChallenge />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/kakao/callback",
      element: <KakaoAuth />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/have-challenge",
      element: <HavePage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
