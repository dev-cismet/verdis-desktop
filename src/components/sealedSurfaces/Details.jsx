import { DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import request, { gql } from "graphql-request";
import { DOMAIN, REST_SERVICE } from "../../constants/verdis";
import { useSelector } from "react-redux";
import { getJWT } from "../../store/slices/auth";
import { getFlaechenId } from "../../store/slices/search";
import { useQuery } from "@tanstack/react-query";

const query = gql`
  query FlaechenDetails($id: Int!) {
    flaeche_by_pk(id: $id) {
      flaecheninfoObject {
        groesse_aus_grafik
        groesse_korrektur
        flaechenart
        anschlussgrad
        beschreibung
      }
      flaechenbezeichnung
      anteil
      bemerkung
      datum_erfassung
      datum_veranlagung
    }
  }
`;
const endpoint = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";

const DetailsRow = ({ title, value, width, customInput }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm w-1/2">{title}:</div>
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
  const jwt = useSelector(getJWT);
  const flaechenId = useSelector(getFlaechenId);

  const { data } = useQuery({
    queryKey: ["flaechenDetails", flaechenId],
    queryFn: async () =>
      request(
        endpoint,
        query,
        { id: flaechenId },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!flaechenId,
  });

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2">
        <DetailsRow
          title="Bezeichnung"
          value={data?.flaeche_by_pk?.flaechenbezeichnung}
        />
        <DetailsRow
          title="Größe (Grafik)"
          value={data?.flaeche_by_pk?.flaecheninfoObject?.groesse_aus_grafik}
        />
        <DetailsRow
          title="Größe (Korrektur)"
          value={data?.flaeche_by_pk?.flaecheninfoObject?.groesse_korrektur}
        />
        <DetailsRow
          title="Flächenart"
          value={data?.flaeche_by_pk?.flaecheninfoObject?.flaechenart}
        />
        <DetailsRow
          title="Anschlussgrad"
          value={data?.flaeche_by_pk?.flaecheninfoObject?.anschlussgrad}
        />
        <DetailsRow
          title="Beschreibung"
          value={data?.flaeche_by_pk?.flaecheninfoObject?.beschreibung}
        />
        <DetailsRow title="Anteil" value={data?.flaeche_by_pk?.anteil} />
        <DetailsRow
          title="Änderungsdatum"
          value={data?.flaeche_by_pk?.datum_erfassung}
        />
        <DetailsRow
          title="Veranlagungsdatum"
          value={data?.flaeche_by_pk?.datum_veranlagung}
        />
        <DetailsRow title="Bemerkung" value={data?.flaeche_by_pk?.bemerkung} />
      </div>
    </CustomCard>
  );
};

export default Details;
