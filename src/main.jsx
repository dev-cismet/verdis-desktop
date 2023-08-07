import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { Button, ConfigProvider, Result } from "antd";
import locale from "antd/locale/de_DE";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import OverviewPage from "./pages/Overview";
import SealedSurfaceOverviewPage from "./pages/SealedSurfaces";
import SealedSurfaceDetailsPage from "./pages/SealedSurfacesDetails";
import StreetCleaningPage from "./pages/StreetCleaning";
import StreetCleaningDetailsPage from "./pages/StreetCleaningDetails";
import InfoPage from "./pages/Info";
import SeepagePermitsPage from "./pages/SeepagePermits";
import SeepagePermitsDetailsPage from "./pages/SeepagePermitsDetails";
import LoginPage from "./pages/Login";
import NavBar from "./components/commons/NavBar";
import { getJWT } from "./store/slices/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const NavBarWrapper = () => {
  const jwt = useSelector(getJWT);

  if (!jwt) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarWrapper />,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Die Seite wurde nicht gefunden"
        extra={
          <Button type="primary" href="/">
            Zurück
          </Button>
        }
      />
    ),
    children: [
      {
        path: "/",
        element: <OverviewPage />,
      },
      {
        path: "/versiegelteFlaechen",
        element: <SealedSurfaceOverviewPage />,
      },
      {
        path: "/versiegelteFlaechen/details",
        element: <SealedSurfaceDetailsPage />,
      },
      {
        path: "/strassenreinigung",
        element: <StreetCleaningPage />,
      },
      {
        path: "/strassenreinigung/details",
        element: <StreetCleaningDetailsPage />,
      },
      {
        path: "/info",
        element: <InfoPage />,
      },
      {
        path: "/versickerungsgenehmigungen",
        element: <SeepagePermitsPage />,
      },
      {
        path: "/versickerungsgenehmigungen/details",
        element: <SeepagePermitsDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E67843",
        },
      }}
      locale={locale}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
