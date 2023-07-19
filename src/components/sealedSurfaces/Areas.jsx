import { Table } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        key: "1",
        name: "A",
        type: "sealed surface",
        area: 125,
      },
      {
        key: "2",
        name: "B",
        type: "sealed surface",
        area: 1254,
      },
      {
        key: "3",
        name: "3",
        type: "sealed surface",
        area: 12,
      },
      {
        key: "4",
        name: "C",
        type: "roof area",
        area: 129,
      },
      {
        key: "5",
        name: "AAABB",
        type: "sealed surface",
        area: 125,
      },
      {
        key: "6",
        name: "D",
        type: "roof area",
        area: 9,
      },
    ],
    columns: [
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
        title: "Fläche",
        dataIndex: "area",
        key: "area",
        render: (area) => <div>{area} m²</div>,
      },
    ],
  };
};

const Areas = ({
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
      />
    </CustomCard>
  );
};

export default Areas;
