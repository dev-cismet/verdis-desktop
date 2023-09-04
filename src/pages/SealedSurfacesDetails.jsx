import React from "react";
import Map from "../components/commons/Map";
import Details from "../components/sealedSurfaces/Details";
import Chat from "../components/commons/Chat";
import { areasDetailsExtractor } from "../tools/extractors";
import TableCard from "../components/ui/TableCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaechenId,
  storeFlaeche,
  storeFlaechenId,
} from "../store/slices/search";
import { compare } from "../tools/helper";
import SubNav from "../components/sealedSurfaces/SubNav";

const Page = ({
  width = "100%",
  height = "100vh",
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
  const dispatch = useDispatch();
  const flaechenId = useSelector(getFlaechenId);

  const cardStyleTable = { width: "50%", height: "100%", minHeight: 0 };
  const cardStyleDetails = { width: "100%", height: "50%", minHeight: 0 };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <SubNav />
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <TableCard
            width={cardStyleTable.width}
            height={cardStyleTable.height}
            style={cardStyleTable}
            title="Flächen"
            columns={[
              {
                title: "Bezeichnung",
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => compare(a.name, b.name),
              },
              {
                title: "Größe m²",
                dataIndex: "groesseGrafik",
                key: "groesseGrafik",
                sorter: (a, b) => compare(a.groesseGrafik, b.groesseGrafik),
              },
              {
                title: "Flächenart",
                dataIndex: "type",
                key: "type",
                sorter: (a, b) => compare(a.type, b.type),
              },
              {
                title: "Anschlussgrad",
                dataIndex: "anschlussgrad",
                key: "anschlussgrad",
                sorter: (a, b) => compare(a.anschlussgrad, b.anschlussgrad),
              },
              {
                title: "Beschreibung",
                dataIndex: "beschreibung",
                key: "beschreibung",
                sorter: (a, b) => compare(a.beschreibung, b.beschreibung),
              },
              {
                title: "Erfassungdatum",
                dataIndex: "datumErfassung",
                key: "datumErfassung",
                sorter: (a, b) => compare(a.datumErfassung, b.datumErfassung),
              },
            ]}
            id={flaechenId}
            onRowClick={(record) => (
              dispatch(storeFlaeche(record)),
              dispatch(storeFlaechenId(record.id))
            )}
            extractor={areasDetailsExtractor}
          />
          <div className="flex flex-col gap-2 h-full w-[50%]">
            <Details
              width={cardStyleDetails.width}
              height={cardStyleDetails.height}
              style={cardStyleDetails}
            />
            <Map width={"100%"} height={"50%"} />
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
