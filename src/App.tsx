import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import KakaoAuth from "./routes/KakaoAuth";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";

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
      ],
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
