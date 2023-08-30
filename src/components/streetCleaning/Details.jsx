import { Input } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getFront } from "../../store/slices/search";

const mockExtractor = (input) => {
  return [];
};

const DetailsRow = ({ title, value }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="w-full font-medium">{title}:</span>
      <Input value={value} />
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
  const mockData = extractor(dataIn);
  const front = useSelector(getFront);

  return (
    <CustomCard style={{ ...style, width, height }} title="Details">
      <div className="flex flex-col gap-1">
        <DetailsRow title="Nummer" value={front?.nummer} />
        <DetailsRow title="Länge (Grafik)" value={front?.laengeGrafik} />
        <DetailsRow title="Länge (Korrektur)" value={front?.laengeKorrektur} />
        <DetailsRow title="Bearbeitet durch" value={front?.bearbeitetDurch} />
        <DetailsRow title="Erfassungsdatum" value={front?.erfassungsdatum} />
        <DetailsRow title="Straße" value={front?.straße} />
        <DetailsRow title="Lage" value={front?.lage} />
        <DetailsRow title="Straßenreinigung" value={front?.straßenReinigung} />
        <DetailsRow title="Bemerkung" value={front?.bemerkung} />
        <DetailsRow title="Veranlagung" value={front?.veranlagung} />
        <DetailsRow title="Garage/Stellplatz" value={front?.garageStellplatz} />
        <DetailsRow title="Anteil" value={front?.anteil} />
        <DetailsRow title="Winkel" value={front?.winkel} />
      </div>
    </CustomCard>
  );
};

export default Details;
