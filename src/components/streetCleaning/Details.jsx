import { Input } from "antd";
import CustomCard from "../ui/Card";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { getFrontenId } from "../../store/slices/search";
import { getJWT } from "../../store/slices/auth";
import { ENDPOINT } from "../../constants/verdis";

const query = gql`
  query FrontenDetails($id: Int!) {
    front_by_pk(id: $id) {
      nummer
      frontinfoObject {
        laenge_grafik
        laenge_korrektur
        strasseObject {
          name
        }
        sr_veranlagung
        lage_sr_satzung {
          sr_bem
        }
        winkel
        anteil
        garage_stellplatz
      }
      bearbeitet_durch
      erfassungsdatum
    }
  }
`;

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

const DetailsRow = ({ title, value }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="w-full">{title}:</span>
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
  const jwt = useSelector(getJWT);
  const frontenId = useSelector(getFrontenId);

  const { data } = useQuery({
    queryKey: ["frontenDetails", frontenId],
    queryFn: async () =>
      request(
        ENDPOINT,
        query,
        { id: frontenId },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!frontenId,
  });

  return (
    <CustomCard style={{ ...style, width, height }} title="Details">
      <div className="flex flex-col gap-1">
        <DetailsRow title="Nummer" value={data?.front_by_pk?.nummer} />
        <DetailsRow
          title="Länge (Grafik)"
          value={data?.front_by_pk?.frontinfoObject?.laenge_grafik}
        />
        <DetailsRow
          title="Länge (Korrektur)"
          value={data?.front_by_pk?.frontinfoObject?.laenge_korrektur}
        />
        <DetailsRow
          title="Bearbeitet durch"
          value={data?.front_by_pk?.bearbeitet_durch}
        />
        <DetailsRow
          title="Erfassungsdatum"
          value={data?.front_by_pk?.erfassungsdatum}
        />
        <DetailsRow
          title="Straße"
          value={data?.front_by_pk?.frontinfoObject?.strasseObject?.name}
        />
        <DetailsRow
          title="Lage"
          value={data?.front_by_pk?.frontinfoObject?.lage_sr}
        />
        <DetailsRow
          title="Straßenreinigung"
          value={data?.front_by_pk?.frontinfoObject?.lage_sr_satzung?.sr_klasse}
        />
        <DetailsRow
          title="Bemerkung"
          value={data?.front_by_pk?.frontinfoObject?.lage_sr_satzung?.sr_bem}
        />
        <DetailsRow
          title="Veranlagung"
          value={data?.front_by_pk?.frontinfoObject?.sr_veranlagung}
        />
        <DetailsRow
          title="Garage/Stellplatz"
          value={data?.front_by_pk?.frontinfoObject?.garage_stellplatz}
        />
        <DetailsRow
          title="Anteil"
          value={data?.front_by_pk?.frontinfoObject?.anteil}
        />
        <DetailsRow
          title="Winkel"
          value={data?.front_by_pk?.frontinfoObject?.winkel}
        />
      </div>
    </CustomCard>
  );
};

export default Details;
