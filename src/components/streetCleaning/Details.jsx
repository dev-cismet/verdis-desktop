import { Input } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
    {
      title: "Nummer",
    },
    {
      title: "Länge (Grafik)",
    },
    {
      title: "Länge (Korrektur)",
    },
    {
      title: "Bearbeitet durch",
    },
    {
      title: "Erfassungsdatum",
    },
    {
      title: "Straße",
    },
    {
      title: "Lage",
    },
    {
      title: "Straßenreinigung",
    },
    {
      title: "Bemerkung",
    },
    {
      title: "Veranlagung",
    },
    {
      title: "Garage/Stellplatz",
    },
    {
      title: "Anteil",
    },
    {
      title: "Winkel",
    },
  ];
};

const Row = ({ title }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="w-full">{title}:</span>
      <Input />
    </div>
  );
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Details">
      <div className="flex flex-col gap-1">
        {data.map((row, i) => (
          <Row title={row.title} key={`detailsRow_${i}`} />
        ))}
      </div>
    </CustomCard>
  );
};

export default Details;
