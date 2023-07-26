import React from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import SewerConnection from "../components/seepagePermits/SewerConnection";
import FileNumber from "../components/seepagePermits/FileNumber";
import NavBar from "../components/commons/NavBar";
import Chat from "../components/commons/Chat";
import InfoBar from "../components/commons/InfoBar";

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

  const cardStyleConnection = { width: "100%", height: "65%", minHeight: 0 };
  const cardStyleFileNumber = { width: "100%", height: "100%", minHeight: 0 };
  const mapHeight = height - 100;

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative"
    >
      <NavBar width={width} highlightedItem={4} />

      <div className="flex flex-col w-full bg-zinc-100 h-[calc(100%-46px)] p-2">
        <InfoBar title="Versickerungsgenehmigungen">
          <Button type="primary">Übersicht</Button>
          <Button>Details</Button>
        </InfoBar>
        <div className="flex gap-2" style={{ maxHeight: mapHeight }}>
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
          <Map width={"80%"} height={mapHeight} />
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
