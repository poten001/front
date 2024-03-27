import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import KakaoAuth from "./routes/KakaoAuth";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import AboutOchaelWanPage from "./pages/SettingPage/About";
import CreateChallengePage from "./pages/CreateChallengePage";
import Mypage from "./pages/MyPage";
import IsChallengeDonePage from "./pages/MyPage/IsChallengeDonePage";


function App() {
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
          path: "/my-page/:id",
          element: <Mypage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "is-challenge-done",
          element: <IsChallengeDonePage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/create-challenge",
      element: <CreateChallengePage />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "kakao-auth",
          element: <KakaoAuth />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
