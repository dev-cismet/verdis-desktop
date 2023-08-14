import { Table } from "antd";
import CustomCard from "../ui/Card";
import {
  getFrontenId,
  getKassenzeichen,
  storeFrontenId,
} from "../../store/slices/search";
import { useDispatch, useSelector } from "react-redux";

const extractor = (kassenzeichen) => {
  const data = kassenzeichen?.frontenArray?.map((row) => ({
    number: row?.frontObject?.nummer,
    length: row?.frontObject?.frontinfoObject?.laenge_grafik,
    class:
      row?.frontObject?.frontinfoObject?.lage_sr_satzung?.strassenreinigung
        ?.key,
    id: row?.frontObject?.id,
  }));

  return data;
};

const columns = [
  {
    title: "Nummer",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Länge in m",
    dataIndex: "length",
    key: "length",
  },
  {
    title: "Klasse",
    dataIndex: "class",
    key: "class",
  },
];

const Fronts = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);
  const frontenId = useSelector(getFrontenId);
  const dispatch = useDispatch();

  return (
    <CustomCard style={{ ...style, width, height }} title="Fronten">
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ position: ["none"] }}
        size="small"
        onRow={(record) => {
          return {
            onClick: () => dispatch(storeFrontenId(record.id)),
          };
        }}
        rowClassName={(record) =>
          `${record.id === frontenId && "bg-zinc-100"} cursor-pointer`
        }
      />
    </CustomCard>
  );
};

export default Fronts;
