import { useSelector } from "react-redux";
import { getKassenzeichen } from "../../store/slices/search";
import CustomCard from "./Card";
import { Table } from "antd";

const mockExtractor = (kassenzeichen) => {
  return [];
};

const TableCard = ({
  width = "100%",
  height = "100%",
  title,
  style,
  columns,
  onRowClick,
  id,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title={title}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record, i) => `tableRow_${i}`}
        size="small"
        onRow={(record) => {
          return {
            onClick: () => onRowClick && onRowClick(record),
          };
        }}
        rowClassName={(record) =>
          `${id ? record.id === id && "bg-primary/20" : ""} cursor-pointer`
        }
      />
    </CustomCard>
  );
};

export default TableCard;
