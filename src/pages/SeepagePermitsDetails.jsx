import React from "react";
import Map from "../components/commons/Map";
import { Button, Checkbox } from "antd";
import Chat from "../components/commons/Chat";
import Exemption from "../components/seepagePermits/Exemption";
import Details from "../components/seepagePermits/Details";
import InfoBar from "../components/commons/InfoBar";
import { useNavigate } from "react-router-dom";
import {
  exemptionExtractor,
  seepageDetailsExtractor,
} from "../tools/extractors";
import TableCard from "../components/ui/TableCard";
import { compare } from "../tools/helper";

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

  const cardStylePermits = { width: "100%", height: "50%", minHeight: 0 };
  const cardStyleDetails = { width: "100%", height: "100%", minHeight: 0 };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Versickerungsgenehmigungen">
          <Button onClick={() => navigate("/versickerungsgenehmigungen")}>
            Übersicht
          </Button>
          <Button
            type="primary"
            onClick={() => navigate("/versickerungsgenehmigungen/details")}
          >
            Details
          </Button>
        </InfoBar>
        <div className="flex flex-col gap-2 h-full max-h-[calc(100%-40px)]">
          <TableCard
            width={cardStylePermits.width}
            height={cardStylePermits.height}
            style={cardStylePermits}
            title="Befreiung/Erlaubnis"
            columns={[
              {
                title: "Aktenzeichen",
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => compare(a.name, b.name),
              },
              {
                title: "Antrag vom",
                dataIndex: "seepageFrom",
                key: "seepageFrom",
                sorter: (a, b) => compare(a.seepageFrom, b.seepageFrom),
              },
              {
                title: "gültig bis",
                dataIndex: "seepageUntil",
                key: "seepageUntil",
                sorter: (a, b) => compare(a.seepageUntil, b.seepageUntil),
              },
              {
                title: "Nutzung",
                dataIndex: "useCase",
                key: "useCase",
                sorter: (a, b) => compare(a.useCase, b.useCase),
              },
              {
                title: "Typ",
                dataIndex: "type",
                key: "type",
                sorter: (a, b) => compare(a.type, b.type),
              },
              {
                title: "Q[l/s]",
                dataIndex: "seepage",
                key: "seepage",
                sorter: (a, b) => compare(a.seepage, b.seepage),
              },
              {
                title: "G-Verth",
                dataIndex: "gVerth",
                key: "gVerth",
                sorter: (a, b) => compare(a.gVerth, b.gVerth),
                render: (gVerth) => (
                  <Checkbox checked={gVerth} className="flex justify-center" />
                ),
              },
            ]}
            extractor={exemptionExtractor}
          />
          <div className="flex gap-2 h-[50%]">
            <Map width={"100%"} height={"100%"} />
            <Details
              width={cardStyleDetails.width}
              height={cardStyleDetails.height}
              style={cardStyleDetails}
              extractor={seepageDetailsExtractor}
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
