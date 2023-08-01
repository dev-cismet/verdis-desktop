import React from "react";
import Map from "../components/commons/Map";
import InfoTable from "../components/info/InfoTable";
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

  const cardStyle = { width: "100%", height: "100%", minHeight: 0 };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Info" className="py-1" />
        <div className="flex flex-col gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex gap-2 h-[80%]">
            <InfoTable
              width={cardStyle.width}
              height={cardStyle.height}
              style={cardStyle}
            />
            <InfoTable
              width={cardStyle.width}
              height={cardStyle.height}
              style={cardStyle}
              title="Alkis Flurstücke"
              dataIn={[
                {
                  title: "217362-28332/0(PRl)",
                  status: "online",
                },
                {
                  title: "317362-28332/0(PRl)",
                  status: "online",
                },
                {
                  title: "517362-28332/0(PRl)",
                  status: "pending",
                },
                {
                  title: "617362-28332/0(PRl)",
                  status: "pending",
                },
                {
                  title: "717362-28332/0(PRl)",
                  status: "offline",
                },
              ]}
            />
          </div>

          <Map width="100%" height="100%" />
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
