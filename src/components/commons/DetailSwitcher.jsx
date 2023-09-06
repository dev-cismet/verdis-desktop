import { Button } from "antd";
import InfoBar from "./InfoBar";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";

const DetailSwitcher = ({ title, buttonName, baseRoute }) => {
  const navigate = useNavigate();
  const match = useMatch(baseRoute);
  const [urlParams] = useSearchParams();

  return (
    <InfoBar title={title}>
      <Button
        type={match ? "primary" : "default"}
        onClick={() =>
          !match &&
          navigate(".." + `?${urlParams}`, { relative: "path", state: {} })
        }
      >
        Übersicht
      </Button>
      <Button
        type={match ? "default" : "primary"}
        onClick={() =>
          match && navigate("./details" + `?${urlParams}`, { relative: "path" })
        }
      >
        {buttonName}
      </Button>
    </InfoBar>
  );
};

export default DetailSwitcher;
