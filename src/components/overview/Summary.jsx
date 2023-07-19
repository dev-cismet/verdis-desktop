import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
    {
      title: "Reinigung",
      items: [
        {
          name: "A4-323",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 1234,
        },
        {
          name: "A5-456",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 1,
        },
        {
          name: "A6-789",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 12,
        },
        {
          name: "A7-112",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 123,
        },
      ],
    },
    {
      title: "Winterdienst",
      items: [
        {
          name: "W4-323",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 1234,
        },
        {
          name: "W5-456",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 1,
        },
        {
          name: "W6-789",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 12,
        },
        {
          name: "W7-112",
          fileNumber: 2807,
          streetName: "Rathenaustr.",
          area: 123,
        },
      ],
    },
  ];
};

const Summary = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title="ESW Zusammenfassung">
      {data.map((categories, i) => (
        <div
          key={`sum_categories_${i}`}
          className="flex flex-col gap-2 text-sm"
        >
          <div className={`font-semibold ${i > 0 && "pt-4"}`}>
            {categories.title}
          </div>
          {categories.items.map((item, i) => (
            <div key={`sum_items_${i}`} className="flex w-full items-center">
              <div className="w-full">{item.name}</div>
              <div className="w-full">#{item.fileNumber}</div>
              <div className="w-full">{item.streetName}</div>
              <div className="w-1/2">{item.area}m</div>
            </div>
          ))}
        </div>
      ))}
    </CustomCard>
  );
};

export default Summary;
