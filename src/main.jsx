import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, ConfigProvider, Result } from "antd";
import "antd/dist/reset.css";
import locale from "antd/locale/de_DE";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
  useLocation,
} from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/commons/NavBar";
import "./index.css";
import InfoPage from "./pages/Info";
import LoginPage from "./pages/Login";
import OverviewPage from "./pages/Overview";
import SealedSurfaceOverviewPage from "./pages/SealedSurfaces";
import SealedSurfaceDetailsPage from "./pages/SealedSurfacesDetails";
import SeepagePermitsPage from "./pages/SeepagePermits";
import SeepagePermitsDetailsPage from "./pages/SeepagePermitsDetails";
import StreetCleaningPage from "./pages/StreetCleaning";
import StreetCleaningDetailsPage from "./pages/StreetCleaningDetails";
import store from "./store";
import { getJWT } from "./store/slices/auth";
import { getReadOnly } from "./store/slices/settings";

const persistor = persistStore(store);

const NavBarWrapper = () => {
  const jwt = useSelector(getJWT);
  const readOnly = useSelector(getReadOnly);
  const location = useLocation();

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen w-full">
      <NavBar />
      <ConfigProvider componentDisabled={readOnly}>
        <Outlet />
      </ConfigProvider>
    </div>
  );
};

const router = createHashRouter(
  [
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
  ],
  {}
);

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
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </QueryClientProvider>
      </PersistGate>
    </ConfigProvider>
  </React.StrictMode>
);
