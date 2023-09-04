import { DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getFlaeche } from "../../store/slices/search";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const DetailsRow = ({ title, value, width, customInput }) => {
  return (
    <div className={"flex justify-between gap-2"}>
      <div className="text-sm font-medium w-1/2">{title}:</div>
      <div className={`${width > 365 ? "w-full" : "w-1/2"}`}>
        {customInput ? customInput : <Input value={value} size="small" />}
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
      <div className="flex flex-col gap-2 h-full">
        <DetailsRow title="Flächenbezeichnung" value={flaeche?.name} />
        <DetailsRow title="Größe (Grafik)" value={flaeche?.groesseGrafik} />
        <DetailsRow
          title="Größe (Korrektur)"
          value={flaeche?.groesseKorrektor}
        />
        <DetailsRow
          title="Flächenart"
          customInput={
            <Select
              value={flaeche?.flaechenArt}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow
          title="Anschlussgrad"
          customInput={
            <Select
              value={flaeche?.anschlussgrad}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow
          title="Beschreibung"
          customInput={
            <Select
              value={flaeche?.beschreibung}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow title="Anteil" value={flaeche?.anteil} />
        <DetailsRow
          title="Änderungsdatum"
          customInput={
            <DatePicker
              className="w-full"
              format="DD.MM.YYYY"
              placeholder=""
              size="small"
              value={
                flaeche?.datumErfassung
                  ? dayjs(
                      dayjs(flaeche?.datumErfassung).format("DD.MM.YYYY"),
                      "DD.MM.YYYY"
                    )
                  : null
              }
            />
          }
        />
        <DetailsRow
          title="Veranlagungsdatum"
          value={flaeche?.datumVeranlagung}
        />
        <DetailsRow
          title="Bemerkung"
          size="small"
          customInput={
            <TextArea className="w-full" value={flaeche?.bemerkung} />
          }
        />
      </div>
    </CustomCard>
  );
};

export default Details;
