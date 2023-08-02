import { Button, Checkbox, Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "/logo.svg";

const mockExtractor = (input) => {
  return {};
};

const Login = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
}) => {
  return (
    <div
      className="flex flex-col gap-8 items-center w-full"
      style={{ width, height }}
    >
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
      <Button type="primary" size="large">
        Anmelden
      </Button>
    </div>
  );
};

export default Login;
