import { Table } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        key: "1",
        name: "4",
        size: 34,
        type: "FF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
      {
        key: "2",
        name: "6",
        size: 22,
        type: "RF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
      {
        key: "3",
        name: "3",
        size: 55,
        type: "IF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
      {
        key: "4",
        name: "CC",
        size: 200,
        type: "DF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
      {
        key: "5",
        name: "ABC",
        size: 2,
        type: "RF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
      {
        key: "6",
        name: "A",
        size: 2,
        type: "DF",
        connection: "angeschl",
        description: "Anex",
        date: "21.7.2018",
      },
    ],
    columns: [
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
    ],
  };
};

const TableView = ({
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
        pagination={{ position: ["bottomCenter"] }}
      />
    </CustomCard>
  );
};

export default TableView;
