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
    <Card
      style={{ ...style, width, height }}
      bodyStyle={{ maxHeight: "calc(100% - 37px)" }}
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
        scroll={{ y: height - 120 }}
      />
    </Card>
  );
};

export default Areas;
