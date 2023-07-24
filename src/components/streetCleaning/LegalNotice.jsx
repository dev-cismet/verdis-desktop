import { Checkbox } from "antd";
import CustomCard from "../ui/Card";
import { useState } from "react";

const mockExtractor = (input) => {
  return [
    {
      title: "Grunddienstbarkeit",
    },
    {
      title: "Baulasten",
    },
    {
      title: "Quadratwurzel",
    },
    {
      title: "keine gesicherte Erschließung",
    },
  ];
};

const Row = ({ title }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="w-full flex justify-between items-center cursor-pointer"
      onClick={() => setIsChecked(!isChecked)}
    >
      <span>{title}</span>
      <Checkbox checked={isChecked} />
    </div>
  );
};

const LegalNotice = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Rechtliche Hinweise">
      <div className="flex flex-col gap-1 p-2">
        {data.map((row, i) => (
          <Row title={row.title} key={`legalNotice_${i}`} />
        ))}
      </div>
    </CustomCard>
  );
};

export default LegalNotice;
