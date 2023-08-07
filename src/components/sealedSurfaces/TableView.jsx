import { Table } from "antd";
import CustomCard from "../ui/Card";
import request, { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { getJWT } from "../../store/slices/auth";
import {
  getFlaechenId,
  getKassenzeichen,
  storeFlaechenId,
} from "../../store/slices/search";
import { useQuery } from "@tanstack/react-query";
import { DOMAIN, REST_SERVICE } from "../../constants/verdis";

const query = gql`
  query DetailsTable($kassenzeichen: Int) {
    kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
      flaechenArray(
        order_by: {
          flaecheObject: {
            flaecheninfoObject: { flaechenbeschreibung: { beschreibung: asc } }
          }
        }
      ) {
        flaecheObject {
          datum_erfassung
          flaechenbezeichnung
          flaecheninfoObject {
            groesse_aus_grafik
            flaechenartObject {
              art_abkuerzung
            }
            anschlussgradObject {
              grad_abkuerzung
            }
            flaechenbeschreibung {
              beschreibung
            }
          }
          id
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
    title: "Bezeichnung",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Größe m²",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Flächenart",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Anschlussgrad",
    dataIndex: "connection",
    key: "connection",
  },
  {
    title: "Beschreibung",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Erfassungdatum",
    dataIndex: "date",
    key: "date",
  },
];

const TableView = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const mockData = extractor(dataIn);
  const jwt = useSelector(getJWT);
  const kassenzeichen = useSelector(getKassenzeichen);
  const flaechenId = useSelector(getFlaechenId);
  const dispatch = useDispatch();

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
    type: row?.flaecheObject?.flaecheninfoObject?.flaechenartObject
      ?.art_abkuerzung,
    connection:
      row?.flaecheObject?.flaecheninfoObject?.anschlussgradObject
        ?.grad_abkuerzung,
    description:
      row?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
        ?.beschreibung,
    date: row?.flaecheObject?.datum_erfassung,
    id: row?.flaecheObject?.id,
  }));

  return (
    <CustomCard style={{ ...style, width, height }} title="Flächen">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        onRow={(record, i) => {
          return {
            onClick: () => dispatch(storeFlaechenId(record.id)),
          };
        }}
        rowClassName={(record) =>
          `${record.id === flaechenId && "bg-zinc-100"} cursor-pointer`
        }
      />
    </CustomCard>
  );
};

export default TableView;
