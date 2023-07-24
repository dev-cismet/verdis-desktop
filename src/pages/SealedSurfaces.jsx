import React from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import ChangeRequests from "../components/sealedSurfaces/ChangeRequests";
import Sums from "../components/sealedSurfaces/Sums";
import Areas from "../components/sealedSurfaces/Areas";
import NavBar from "../components/commons/NavBar";
import Chat from "../components/commons/Chat";

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

  const cardStyleArea = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleSum = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleChangeReq = {
    width: "100%",
    height: "100%",
    maxHeight: 140,
    minHeight: 0,
  };
  const mapHeight = height - 100;

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative"
    >
      <NavBar width={width} />

      <div className="flex flex-col w-full bg-zinc-100 h-[calc(100%-46px)] p-2">
        <div className="flex items-center justify-between w-full">
          <h4>Versiegelte Flächen</h4>
          <div className="flex items-center gap-2">
            <Button type="primary">Übersicht</Button>
            <Button>Flächen</Button>
          </div>
        </div>
        <div className="flex gap-2" style={{ maxHeight: mapHeight }}>
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <Areas
              width={cardStyleArea.width}
              height={cardStyleArea.height}
              style={cardStyleArea}
            />
            <Sums
              width={cardStyleSum.width}
              height={cardStyleSum.height}
              style={cardStyleSum}
            />

            <ChangeRequests
              width={cardStyleChangeReq.width}
              height={cardStyleChangeReq.height}
              style={cardStyleChangeReq}
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
