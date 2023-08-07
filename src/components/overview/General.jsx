import { Checkbox, DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getJWT } from "../../store/slices/auth";
import dayjs from "dayjs";
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { DOMAIN, REST_SERVICE } from "../../constants/verdis";
import { getKassenzeichen } from "../../store/slices/search";
import TextArea from "antd/es/input/TextArea";

const query = gql`
  query Allgemein($kassenzeichen: Int) {
    kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
      datum_erfassung
      bemerkung
      sperre
    }
    aenderungsanfrage(
      where: { kassenzeichen_nummer: { _eq: $kassenzeichen } }
    ) {
      aenderungsanfrage_status {
        name
      }
    }
  }
`;

const endpoint = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";

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
  const kassenzeichen = useSelector(getKassenzeichen);
  const dateFormat = "DD.MM.YYYY";

  const { data } = useQuery({
    queryKey: ["data", kassenzeichen],
    queryFn: async () =>
      request(
        endpoint,
        query,
        { kassenzeichen: kassenzeichen },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!kassenzeichen,
  });

  const date = data?.kassenzeichen[0]?.datum_erfassung
    ? dayjs(
        dayjs(data?.kassenzeichen[0]?.datum_erfassung).format(dateFormat),
        dateFormat
      )
    : null;

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
              value={date}
            />
          }
          width={width}
        />
        <GeneralRow
          title="Bemerkung"
          width={width}
          customInput={
            <TextArea className={`${width > 365 ? "w-full" : "w-1/2"}`} />
          }
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
                { value: "in Bearbeitung", label: "In Bearbeitung" },
                { value: "erledigt", label: "Erledigt" },
                { value: "geschlossen", label: "Geschlossen" },
                { value: "ausstehend", label: "Ausstehend" },
                { value: "archiviert", label: "Archiviert" },
                { value: "_neue Nachricht", label: "Neue Nachricht" },
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
