import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  if (input) {
    return input;
  }

  return [
    {
      title: "217362-28332/0(PRl)",
      status: "online",
    },
    {
      title: "317362-28332/0(PRl)",
      status: "pending",
    },
    {
      title: "417362-28332/0(PRl)",
      status: "offline",
    },
  ];
};

const Row = ({ title, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#21FF37";
      case "pending":
        return "#FFCE21";
      case "offline":
        return "#FF0000";
    }
  };

  return (
    <>
      <div className="flex items-center w-full gap-3 px-2 text-base">
        <div
          className="w-2 h-2"
          style={{ backgroundColor: getStatusColor(status) }}
        ></div>
        <span>{title}</span>
      </div>
      <hr className="h-px bg-gray-100 border-0" />
    </>
  );
};

const Geometrics = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
  title = "Geometrien",
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title={title}>
      {data.map((row, i) => (
        <Row key={`geometrics_${i}`} status={row.status} title={row.title} />
      ))}
    </CustomCard>
  );
};

export default Geometrics;
