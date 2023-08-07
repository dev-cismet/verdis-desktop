import { Table } from "antd";
import CustomCard from "../ui/Card";
import { DOMAIN, REST_SERVICE } from "../../constants/verdis";
import { useSelector } from "react-redux";
import { getJWT } from "../../store/slices/auth";
import { getKassenzeichen } from "../../store/slices/search";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const query = gql`
  query Table($kassenzeichen: Int) {
    kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
      flaechenArray(
        order_by: {
          flaecheObject: {
            flaecheninfoObject: { flaechenbeschreibung: { beschreibung: asc } }
          }
        }
      ) {
        flaecheObject {
          flaechenbezeichnung
          flaecheninfoObject {
            groesse_aus_grafik
            flaechenbeschreibung {
              beschreibung
            }
          }
        }
      }
    }
  }
`;
const endpoint = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";

const mockExtractor = (input) => {
  return [];
};

const columns = [
  {
    title: "Bez.",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Typ",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Größe",
    dataIndex: "size",
    key: "size",
    render: (area) => <div>{area} m²</div>,
  },
];

const Areas = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const mockData = extractor(dataIn);
  const jwt = useSelector(getJWT);
  const kassenzeichen = useSelector(getKassenzeichen);

  const { data } = useQuery({
    queryKey: ["detailsTable", kassenzeichen],
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

  const dataSource = data?.kassenzeichen[0]?.flaechenArray?.map((row) => ({
    name: row?.flaecheObject?.flaechenbezeichnung,
    size: row?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: row?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
      ?.beschreibung,
  }));

  return (
    <CustomCard style={{ ...style, width, height }} title="Flächen">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
      />
    </CustomCard>
  );
};

export default Areas;
