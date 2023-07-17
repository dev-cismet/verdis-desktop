import { Card, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        key: "1",
        name: "A",
        type: "sealed surface",
        area: "125 m²",
      },
      {
        key: "2",
        name: "B",
        type: "sealed surface",
        area: "1254 m²",
      },
      {
        key: "3",
        name: "3",
        type: "sealed surface",
        area: "12 m²",
      },
      {
        key: "4",
        name: "C",
        type: "roof area",
        area: "129 m²",
      },
      {
        key: "5",
        name: "AAABB",
        type: "sealed surface",
        area: "125 m²",
      },
      {
        key: "6",
        name: "D",
        type: "roof area",
        area: "9 m²",
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
    <Card
      style={{ ...style, width, height }}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> Flächen
        </span>
      }
      size="small"
      hoverable={false}
      shadow={true}
    >
      <Table
        dataSource={data.dataSource}
        columns={data.columns}
        pagination={{ position: ["none"] }}
        scroll={{ y: height }}
      />
    </Card>
  );
};

export default Areas;
