import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster, ToastPosition } from 'react-hot-toast';
import MainPage from './pages/MainPage/MainPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
  ]);

  const toasterProps = {
    containerStyle: {
      fontFamily: 'Inter, sans-serif',
    },
    toastOptions: {
      style: {
        backgroundColor: '#f9eec5',
        color: '#262626',
      },
    },
    position: 'bottom-center' as ToastPosition,
  };

  return (
    <>
      <RouterProvider router={router} />
      <Toaster {...toasterProps} />
    </>
  );
};

export default App;
