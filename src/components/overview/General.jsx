import { Checkbox, DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { fetchGraphQL } from "../../tools/graphql";
import { useSelector } from "react-redux";
import { getJWT } from "../../store/slices/auth";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";

const query = `query Allgemein($kassenzeichen: Int) {
  kassenzeichen(where: {kassenzeichennummer8: {_eq: $kassenzeichen}}) {
    datum_erfassung
    bemerkung
    sperre
  }
  aenderungsanfrage(where: {kassenzeichen_nummer: {_eq: $kassenzeichen}}) {
    aenderungsanfrage_status {
      name
    }
  }
}`;

const GeneralRow = ({ title, placeholder, width, customInput, value }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm w-1/2">{title}:</div>
      {customInput ? (
        customInput
      ) : (
        <Input
          className={`${width > 365 ? "w-full" : "w-1/2"}`}
          placeholder={placeholder}
          value={value}
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
  // const data = extractor(dataIn);
  const jwt = useSelector(getJWT);
  const kassenzeichen = 60432515;
  const dateFormat = "DD.MM.YYYY";
  const [data, setData] = useState();
  const getData = async () => {
    const result = await fetchGraphQL(
      query,
      { kassenzeichen: kassenzeichen },
      jwt
    );
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2">
        <GeneralRow
          title="Kassenzeichen"
          placeholder="123456790"
          width={width}
          value={kassenzeichen}
        />
        <GeneralRow
          title="Datum der Erfassung"
          customInput={
            <DatePicker
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              placeholder="02.03.2023"
              format={dateFormat}
              value={dayjs(
                dayjs(data?.kassenzeichen[0]?.datum_erfassung).format(
                  dateFormat
                ),
                dateFormat
              )}
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
          customInput={<Checkbox value={data?.kassenzeichen[0]?.sperre} />}
          width={width}
        />
        <GeneralRow
          title="Änderungsanfrage"
          customInput={
            <Select
              placeholder="In Bearbeitung"
              options={[
                { value: "bearbeitung", label: "In Bearbeitung" },
                { value: "erledigt", label: "Erledigt" },
                { value: "prüfung", label: "Wird geprüft" },
              ]}
              showArrow={false}
              value={data?.aenderungsanfrage[0]?.aenderungsanfrage_status?.name}
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
