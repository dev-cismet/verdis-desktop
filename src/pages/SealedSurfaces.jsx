import Map from "../components/commons/Map";
import ChangeRequests from "../components/sealedSurfaces/ChangeRequests";
import Sums from "../components/sealedSurfaces/Sums";
import Chat from "../components/commons/Chat";
import { areasExtractor, sumsExtractor } from "../tools/extractors";
import TableCard from "../components/ui/TableCard";
import { compare } from "../tools/helper";
import SubNav from "../components/sealedSurfaces/SubNav";

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

  const cardStyleArea = { width: "100%", height: "40%", minHeight: 0 };
  const cardStyleSum = { width: "100%", height: "40%", minHeight: 0 };
  const cardStyleChangeReq = {
    width: "100%",
    height: "20%",
    minHeight: 0,
  };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <SubNav />
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <TableCard
              width={cardStyleArea.width}
              height={cardStyleArea.height}
              style={cardStyleArea}
              title="Flächen"
              columns={[
                {
                  title: "Bez.",
                  dataIndex: "name",
                  key: "name",
                  sorter: (a, b) => compare(a.name, b.name),
                },
                {
                  title: "Typ",
                  dataIndex: "type",
                  key: "type",
                  sorter: (a, b) => compare(a.type, b.type),
                },
                {
                  title: "Größe",
                  dataIndex: "size",
                  key: "size",
                  sorter: (a, b) => compare(a.size, b.size),
                  render: (area) => <div>{area} m²</div>,
                },
              ]}
              extractor={areasExtractor}
            />
            <Sums
              width={cardStyleSum.width}
              height={cardStyleSum.height}
              style={cardStyleSum}
              extractor={sumsExtractor}
            />

            <ChangeRequests
              width={cardStyleChangeReq.width}
              height={cardStyleChangeReq.height}
              style={cardStyleChangeReq}
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
