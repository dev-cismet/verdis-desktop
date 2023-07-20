import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import { Button, Space } from "antd";
import { Typography } from "antd";
import { DOMAIN, REST_SERVICE } from "./constants/verdis";
import { useSelector, useDispatch } from "react-redux";
import {
  getJWT,
  setLoginRequested,
  storeJWT,
  storeLogin,
} from "./store/slices/auth";
import queries from "./constants/queries";
import { fetchGraphQL } from "./tools/graphql";
import TextArea from "antd/es/input/TextArea";
import useDevSecrets from "./hooks/useDevSecrets";
const { Title } = Typography;
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const jwt = useSelector(getJWT);
  const dispatch = useDispatch();
  const { user, pw } = useDevSecrets();

  console.log("jwt", jwt);
  return (
    <div className="App" style={{ overflow: "auto" }}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React = VerDIS-Desktop</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Title level={2}>... and Ant Design 5 </Title>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <div style={{ marginTop: 100 }}>
        <div>{jwt !== undefined ? "Logged in" : "not logged in"}</div>

        <Space>
          <Button
            onClick={() => {
              login(user, pw, dispatch);
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              console.log("jwt", jwt);
              setText(jwt);
            }}
          >
            JWT
          </Button>
          <Button
            onClick={() => {
              const gqlQuery = queries.kassenzeichen;
              const queryParameter = {
                kassenzeichen: 60432515,
              };

              //local async query
              (async () => {
                const result = await fetchGraphQL(
                  gqlQuery,
                  queryParameter,
                  jwt
                );
                setText(JSON.stringify(result, null, 2));
                console.log("result", result);
              })();
            }}
          >
            Query
          </Button>
          <Button
            onClick={() => {
              //local async query
              (async () => {
                const result = await fetchGraphQL(queries.keys, {}, jwt);
                setText(JSON.stringify(result, null, 2));
                console.log("result", result);
              })();
            }}
          >
            Keys
          </Button>
        </Space>
      </div>
      <div style={{ marginTop: 100 }}>
        <TextArea
          value={text}
          autoSize={{
            minRows: 2,
            maxRows: 20,
          }}
        ></TextArea>
      </div>
    </div>
  );
}

export default App;

const login = (user, pw, dispatch) => {
  fetch(REST_SERVICE + "/users", {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(user + "@" + DOMAIN + ":" + pw),
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        response.json().then(function (responseWithJWT) {
          const jwt = responseWithJWT.jwt;
          console.log("Anmeldung erfolgreich.");

          setTimeout(() => {
            dispatch(storeJWT(jwt));
            dispatch(storeLogin(user));
            dispatch(setLoginRequested(false));
          }, 500);
        });
      } else {
        console.log("Bei der Anmeldung ist ein Fehler aufgetreten. ");
      }
    })
    .catch(function (err) {
      console.log("Bei der Anmeldung ist ein Fehler aufgetreten. ", err);
    });
};
