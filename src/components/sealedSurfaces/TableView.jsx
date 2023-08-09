import { Table } from "antd";
import CustomCard from "../ui/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaechenId,
  getKassenzeichen,
  storeFlaechenId,
} from "../../store/slices/search";

const extractor = (input) => {
  const data = input?.flaechenArray?.map((flaeche) => ({
    name: flaeche?.flaecheObject?.flaechenbezeichnung,
    size: flaeche?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: flaeche?.flaecheObject?.flaecheninfoObject?.flaechenartObject
      ?.art_abkuerzung,
    connection:
      flaeche?.flaecheObject?.flaecheninfoObject?.anschlussgradObject
        ?.grad_abkuerzung,
    description:
      flaeche?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
        ?.beschreibung,
    date: flaeche?.flaecheObject?.datum_erfassung,
    id: flaeche?.flaecheObject?.id,
  }));

  console.log(data);

  return data;
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

const TableView = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);
  const flaechenId = useSelector(getFlaechenId);
  const dispatch = useDispatch();

  return (
    <CustomCard style={{ ...style, width, height }} title="Flächen">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        size="small"
        onRow={(record) => {
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
