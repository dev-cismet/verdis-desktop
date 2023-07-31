import React from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import NavBar from "../components/commons/NavBar";
import Chat from "../components/commons/Chat";
import LegalNotice from "../components/streetCleaning/LegalNotice";
import Fronts from "../components/streetCleaning/Fronts";
import Summary from "../components/overview/Summary";
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

  const cardStyleFronts = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleLegal = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleSummary = {
    width: "100%",
    height: "100%",
    minHeight: 0,
  };
  const mapHeight = height - 100;

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative"
    >
      <div className="flex flex-col w-full bg-zinc-100 h-[calc(100%-46px)] p-2">
        <InfoBar title="Straßenreinigung">
          <Button type="primary">Übersicht</Button>
          <Button>Flächen</Button>
        </InfoBar>
        <div className="flex gap-2" style={{ maxHeight: mapHeight }}>
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <Fronts
              width={cardStyleFronts.width}
              height={cardStyleFronts.height}
              style={cardStyleFronts}
            />
            <LegalNotice
              width={cardStyleLegal.width}
              height={cardStyleLegal.height}
              style={cardStyleLegal}
            />

            <Summary
              width={cardStyleSummary.width}
              height={cardStyleSummary.height}
              style={cardStyleSummary}
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
