import React, { useEffect, useRef, useState } from "react";
import Map from "../components/commons/Map";
import { Button } from "antd";
import ChangeRequests from "../components/sealedSurfaces/ChangeRequests";
import Sums from "../components/sealedSurfaces/Sums";
import Areas from "../components/sealedSurfaces/Areas";
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
  const cardRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  const cardStyleArea = { width: "100%", height: "40%", minHeight: 0 };
  const cardStyleSum = { width: "100%", height: "40%", minHeight: 0 };
  const cardStyleChangeReq = {
    width: "100%",
    height: "20%",
    minHeight: 0,
  };

  useEffect(() => {
    setMapWidth(cardRef?.current?.offsetWidth);
    setMapHeight(cardRef?.current?.offsetHeight);

    const setSize = () => {
      setMapWidth(cardRef?.current?.offsetWidth);
      setMapHeight(cardRef?.current?.offsetHeight);
    };

    window.addEventListener("resize", setSize);

    return () => window.removeEventListener("resize", setSize);
  }, []);

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Versiegelte Flächen">
          <Button type="primary" href="/versiegelteFlaechen">
            Übersicht
          </Button>
          <Button href="/versiegelteFlaechen/details">Flächen</Button>
        </InfoBar>
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
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
          <div ref={cardRef} className="h-full w-[80%]">
            <Map width={mapWidth} height={mapHeight} />
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
