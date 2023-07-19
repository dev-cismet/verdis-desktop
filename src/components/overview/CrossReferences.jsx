import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
    {
      value: 223458,
    },
    {
      value: 467452,
    },
    {
      value: 123456,
    },
    {
      value: 245623,
    },
    {
      value: 458094,
    },
    {
      value: 587834,
    },
    {
      value: 987576,
    },
    {
      value: 426485,
    },
  ];
};

const CrossReferences = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title="Querverweise">
      <div className="flex flex-col gap-4 items-center justify-center font-medium">
        {data.map((row) => (
          <span>{row.value}</span>
        ))}
      </div>
    </CustomCard>
  );
};

export default CrossReferences;
