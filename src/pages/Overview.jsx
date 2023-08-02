import React from "react";
import Map from "../components/commons/Map";
import General from "../components/overview/General";
import Statistics from "../components/overview/Statistics";
import CrossReferences from "../components/overview/CrossReferences";
import Sums from "../components/sealedSurfaces/Sums";
import Summary from "../components/overview/Summary";
import InfoBar from "../components/commons/InfoBar";

const Page = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const cardStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Übersicht" className="py-1" />

        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full max-h-[calc(100%-40px)]">
          <General
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
          <Statistics
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
          <CrossReferences
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
          <Sums
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
          <div className="col-span-2 row-span-2">
            <Map width={"100%"} height={"100%"} />
          </div>
          <Summary
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
