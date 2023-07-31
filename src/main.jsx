import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import OverviewPage from "./pages/Overview";
import SealedSurfaceOverviewPage from "./pages/SealedSurfaces";
import SealedSurfaceDetailsPage from "./pages/SealedSurfacesDetails";
import StreetCleaningPage from "./pages/StreetCleaning";
import InfoPage from "./pages/Info";
import SeepagePermitsPage from "./pages/SeepagePermits";
import NavBar from "./components/commons/NavBar";

const NavBarWrapper = () => {
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
        path: "/info",
        element: <InfoPage />,
      },
      {
        path: "/versickerungsgenehmigungen",
        element: <SeepagePermitsPage />,
      },
    ],
  },
]);

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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
