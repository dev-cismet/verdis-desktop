import { Checkbox, DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";

const GeneralRow = ({ title, placeholder, width, customInput }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm w-1/2">{title}:</div>
      {customInput ? (
        customInput
      ) : (
        <Input
          className={`${width > 365 ? "w-full" : "w-1/2"}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

const mockExtractor = (input) => {
  return [];
};

const General = ({
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
        <GeneralRow
          title="Kassenzeichen"
          placeholder="123456790"
          width={width}
        />
        <GeneralRow
          title="Datum der Erfassung"
          customInput={
            <DatePicker
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              placeholder="02.03.2023"
            />
          }
          width={width}
        />
        <GeneralRow
          title="Bemerkung"
          placeholder="eine Reaktion auf die Anforderung von Nachweisen"
          width={width}
        />
        <GeneralRow
          title="Veranlagung gesperrt"
          customInput={<Checkbox />}
          width={width}
        />
        <GeneralRow
          title="Änderungsanfrage"
          customInput={
            <Select
              placeholder="In Bearbeitung"
              options={[
                { value: "bearbeitung", label: "In Bearbeitung" },
                { value: "abgeschlossen", label: "Abgeschlossen" },
                { value: "prüfung", label: "Wird geprüft" },
              ]}
              showArrow={false}
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
            />
          }
          width={width}
        />
      </div>
    </CustomCard>
  );
};

export default General;
