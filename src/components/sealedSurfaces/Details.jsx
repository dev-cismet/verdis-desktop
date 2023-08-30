import { DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getFlaeche } from "../../store/slices/search";

const DetailsRow = ({ title, value, width, customInput }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm font-medium w-1/2">{title}:</div>
      <div className={`${width > 365 ? "w-full" : "w-1/2"}`}>
        {customInput ? customInput : <Input value={value} />}
      </div>
    </div>
  );
};

const mockExtractor = (input) => {
  return [];
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const mockData = extractor(dataIn);
  const flaeche = useSelector(getFlaeche);

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2">
        <DetailsRow title="Bezeichnung" value={flaeche?.name} />
        <DetailsRow title="Größe (Grafik)" value={flaeche?.groesseGrafik} />
        <DetailsRow
          title="Größe (Korrektur)"
          value={flaeche?.groesseKorrektor}
        />
        <DetailsRow title="Flächenart" value={flaeche?.flaechenArt} />
        <DetailsRow title="Anschlussgrad" value={flaeche?.anschlussgrad} />
        <DetailsRow title="Beschreibung" value={flaeche?.beschreibung} />
        <DetailsRow title="Anteil" value={flaeche?.anteil} />
        <DetailsRow title="Änderungsdatum" value={flaeche?.datumErfassung} />
        <DetailsRow
          title="Veranlagungsdatum"
          value={flaeche?.datumVeranlagung}
        />
        <DetailsRow title="Bemerkung" value={flaeche?.bemerkung} />
      </div>
    </CustomCard>
  );
};

export default Details;
