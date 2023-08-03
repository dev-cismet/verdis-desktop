import { Button, Checkbox, Input, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "/logo.svg";
import { useDispatch } from "react-redux";
import useDevSecrets from "../../hooks/useDevSecrets";
import { useNavigate } from "react-router-dom";
import { DOMAIN, REST_SERVICE } from "../../constants/verdis";
import {
  setLoginRequested,
  storeJWT,
  storeLogin,
} from "../../store/slices/auth";
import { useState } from "react";

const mockExtractor = (input) => {
  return {};
};

const Login = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
}) => {
  const dispatch = useDispatch();
  const { user, pw } = useDevSecrets();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
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

            setTimeout(() => {
              setLoading(false);
              dispatch(storeJWT(jwt));
              dispatch(storeLogin(user));
              dispatch(setLoginRequested(false));
              navigate("/");
            }, 500);
          });
        } else {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Bei der Anmeldung ist ein Fehler aufgetreten.",
          });
        }
      })
      .catch(function (err) {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Bei der Anmeldung ist ein Fehler aufgetreten. " + err,
        });
      });
  };

  return (
    <div
      className="flex flex-col gap-8 items-center w-full"
      style={{ width, height }}
    >
      {contextHolder}
      <img src={Logo} alt="Logo" className="w-1/2" />

      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-primary border-b-2 border-0 w-fit border-solid">
          Anmeldung
        </h3>
        <Input
          placeholder="Nutzername"
          prefix={<FontAwesomeIcon icon={faUser} color="#E67843" />}
        />
        <Input.Password
          placeholder="Passwort"
          prefix={<FontAwesomeIcon icon={faLock} color="#E67843" />}
        />
        <div className="flex justify-between items-center">
          <Checkbox>Angemeldet bleiben</Checkbox>
          <a href="/forgot-password" className="text-primary no-underline">
            Passwort vergessen?
          </a>
        </div>
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => login()}
        loading={loading}
      >
        Anmelden
      </Button>
    </div>
  );
};

export default Login;
