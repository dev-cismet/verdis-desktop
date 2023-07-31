import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
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
      title: "Anschlussgrad",
      items: [
        {
          name: "angeschlossen",
          area: 123,
        },
        {
          name: "versickernd",
          area: 12345,
        },
      ],
    },
  ];
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
      {data.map((categories, i) => (
        <div
          key={`sum_categories_${i}`}
          className="flex flex-col gap-1 text-sm 3xl:text-base"
        >
          <div className={`font-semibold ${i > 0 && "pt-4"}`}>
            {categories.title}
          </div>
          {categories.items.map((item, i) => (
            <div
              key={`sum_items_${i}`}
              className="flex justify-between w-full items-center"
            >
              <div>{item.name}</div>
              <div>{item.area} m²</div>
            </div>
          ))}
        </div>
      ))}
    </CustomCard>
  );
};

export default Sums;
