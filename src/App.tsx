import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/MainPage/MainPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster containerStyle={{
        fontFamily: "Inter, sans-serif",
      }} position='bottom-center' />
    </>
  );
}

export default App