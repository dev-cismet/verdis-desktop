import { Table } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        key: "1",
        number: 1,
        length: 2,
        class: "A4",
      },
      {
        key: "2",
        number: 2,
        length: 55,
        class: "A4",
      },
      {
        key: "3",
        number: 3,
        length: 34,
        class: "A4",
      },
      {
        key: "4",
        number: 4,
        length: 22,
        class: "A4",
      },
    ],
    columns: [
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
    ],
  };
};

const Fronts = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Flächen">
      <Table
        dataSource={data.dataSource}
        columns={data.columns}
        pagination={{ position: ["none"] }}
        size="small"
      />
    </CustomCard>
  );
};

export default Fronts;
