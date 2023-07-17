import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E67843",
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
