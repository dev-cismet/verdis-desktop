import React from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import SewerConnection from "../components/seepagePermits/SewerConnection";
import FileNumber from "../components/seepagePermits/FileNumber";
import Chat from "../components/commons/Chat";
import InfoBar from "../components/commons/InfoBar";
import { useNavigate } from "react-router-dom";

const Page = ({
  width = "100%",
  height = "100%",
  inStory = false,
  showChat = false,
}) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }
  const navigate = useNavigate();

  const cardStyleConnection = { width: "100%", height: "65%", minHeight: 0 };
  const cardStyleFileNumber = { width: "100%", height: "100%", minHeight: 0 };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Versickerungsgenehmigungen">
          <Button
            type="primary"
            onClick={() => navigate("/versickerungsgenehmigungen")}
          >
            Übersicht
          </Button>
          <Button
            onClick={() => navigate("/versickerungsgenehmigungen/details")}
          >
            Details
          </Button>
        </InfoBar>
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <SewerConnection
              width={cardStyleConnection.width}
              height={cardStyleConnection.height}
              style={cardStyleConnection}
            />
            <FileNumber
              width={cardStyleFileNumber.width}
              height={cardStyleFileNumber.height}
              style={cardStyleFileNumber}
            />
          </div>
          <Map width={"80%"} height={"100%"} />
        </div>
      </div>
      {showChat && (
        <Chat
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 99999,
          }}
          height={height * 0.45}
          width={width * 0.2}
        />
      )}
    </div>
  );
};

export default Page;
