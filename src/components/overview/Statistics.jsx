import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCard from "../ui/Card";
import { faHandPointer, faMap } from "@fortawesome/free-regular-svg-icons";

const mockExtractor = (input) => {
  return [
    {
      value: 8,
      title: "Flächen",
    },
    {
      value: 2,
      title: "Fronten",
    },
    {
      value: 1,
      title: "Versickerungsgenehmigungen",
    },
    {
      value: 2,
      title: "Geometrien",
    },
    {
      value: 4,
      title: "Änderungsanfragen",
    },
  ];
};

const Statistics = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title="Statistik">
      <div className="flex flex-col gap-4 text-sm">
        {data.map((row, i) => (
          <div key={`statistics_row_${i}`} className="flex gap-2 items-center">
            <span>{row.value}</span>
            <span className="w-full">{row.title}</span>
            <FontAwesomeIcon icon={faHandPointer} className="cursor-pointer" />
            <FontAwesomeIcon icon={faMap} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

export default Statistics;
