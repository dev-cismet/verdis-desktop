import React from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import NavBar from "../components/commons/NavBar";
import Chat from "../components/commons/Chat";
import Exemption from "../components/seepagePermits/Exemption";
import Details from "../components/seepagePermits/Details";
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
  const cardStyleDetails = { width: "100%", height: "100%", minHeight: 0 };
  const mapHeight = height * 0.6;

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative"
    >
      <NavBar width={width} highlightedItem={2} />

      <div className="flex flex-col w-full bg-zinc-100 h-[calc(100%-46px)] p-2">
        <InfoBar title="Straßenreinigung">
          <Button>Übersicht</Button>
          <Button type="primary">Details</Button>
        </InfoBar>
        <div
          className="flex flex-col gap-2"
          style={{ maxHeight: height - 100 }}
        >
          <Exemption
            width={cardStyleFronts.width}
            height={cardStyleFronts.height}
            style={cardStyleFronts}
          />
          <div className="flex gap-2" style={{ height: mapHeight }}>
            <Map width={"100%"} height={mapHeight} />
            <Details
              width={cardStyleDetails.width}
              height={cardStyleDetails.height}
              style={cardStyleDetails}
            />
          </div>
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
