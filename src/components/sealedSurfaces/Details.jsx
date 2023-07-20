import { DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";

const DetailsRow = ({ title, placeholder, width, customInput }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm w-1/2">{title}:</div>
      <div className={`${width > 365 ? "w-full" : "w-1/2"}`}>
        {customInput ? customInput : <Input placeholder={placeholder} />}
      </div>
    </div>
  );
};

const mockExtractor = (input) => {
  return [
    {
      title: "Flächenbezeichnung",
      placeholder: "schön",
    },
    {
      title: "Größe (Grafik)",
      placeholder: "25",
    },
    {
      title: "Größe (Korrektur)",
      placeholder: "20",
    },
    {
      title: "Flächenart",
      customInput: (
        <Select
          placeholder="Dachfläche"
          options={[
            { value: "df", label: "Dachfläche" },
            { value: "rf", label: "Rasenfläche" },
          ]}
          className="w-full"
        />
      ),
    },
    {
      title: "Anschlussgrad",
      customInput: (
        <Select
          placeholder="angeschlossen"
          options={[
            { value: "a", label: "angeschlossen" },
            { value: "na", label: "nicht angeschlossen" },
          ]}
          className="w-full"
        />
      ),
    },
    {
      title: "Beschreibung",
      customInput: (
        <Select
          placeholder="schön"
          options={[
            { value: "schön", label: "schön" },
            { value: "nicht_schön", label: "nicht schön" },
          ]}
          className="w-full"
        />
      ),
    },
    {
      title: "Anteil",
      placeholder: "3/4",
    },
    {
      title: "Änderungsdatum",
      placeholder: "23.05.2022",
      customInput: <DatePicker className="w-full" placeholder="02.03.2023" />,
    },
    {
      title: "Veranlagungsdatum",
      placeholder: "23.05.2022",
      customInput: <DatePicker className="w-full" placeholder="02.03.2023" />,
    },
    {
      title: "Bemerkung",
      placeholder: "schön",
    },
    {
      title: "Querverweise",
      placeholder: "ABC123",
    },
  ];
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
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2">
        {data.map((row, i) => (
          <DetailsRow
            title={row.title}
            placeholder={row.placeholder}
            customInput={row.customInput}
            width={width}
            key={`tableRow_${i}`}
          />
        ))}
      </div>
    </CustomCard>
  );
};

export default Details;
