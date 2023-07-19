import { List } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        title: "Bewertung",
        items: [
          {
            name: "710_DF",
            area: 1234,
          },
          {
            name: "720_DF",
            area: 1,
          },
          {
            name: "730_DF",
            area: 12,
          },
          {
            name: "740_DF",
            area: 123,
          },
          {
            name: "750_DF",
            area: 456,
          },
          {
            name: "760_DF",
            area: 1734,
          },
          {
            name: "770_DF",
            area: 7567,
          },
        ],
      },
      {
        title: "Grad der Korrektur",
        items: [
          {
            name: "Connected",
            area: 123,
          },
          {
            name: "Sleeping",
            area: 12345,
          },
        ],
      },
    ],
  };
};

const Sums = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Summen">
      <List
        itemLayout="horizontal"
        dataSource={data.dataSource}
        renderItem={(data) => (
          <>
            <List.Item>
              <List.Item.Meta title={data.title} />
            </List.Item>
            {data.items.map((item) => (
              <List.Item>
                <div>{item.name}</div>
                <div>{item.area} m²</div>
              </List.Item>
            ))}
          </>
        )}
      />
    </CustomCard>
  );
};

export default Sums;
