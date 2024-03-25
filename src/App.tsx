import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import KakaoAuth from "./routes/KakaoAuth";

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
      ],
    },
    {
      path: "/kakao-auth",
      element: <KakaoAuth />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
