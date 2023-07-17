import { Card, List } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const mockExtractor = (input) => {
  return {
    title: "Bewertung",
    assessments: [
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
    <Card
      style={{ ...style, width, height }}
      bodyStyle={{ overflowY: "auto", maxHeight: "calc(100% - 55px)" }}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> Flächen
        </span>
      }
      size="default"
      hoverable={false}
      shadow={true}
    >
      <List
        itemLayout="horizontal"
        dataSource={data.assessments}
        header={data.title}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta description={item.name} />
            <div>{item.area}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Sums;
