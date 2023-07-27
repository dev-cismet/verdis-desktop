import { Checkbox, Input, Select } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
    {
      title: "Aktenzeichen",
    },
    {
      title: "Antrag vom",
    },
    {
      title: "Gültig bis",
    },
    {
      title: "Nutzung",
      select: true,
    },
    {
      title: "Typ",
      select: true,
      seperator: true,
    },
    {
      title: "Q[l/s]",
      select: true,
    },
    {
      title: "G-Verh",
      checkbox: true,
    },
    {
      title: "Bemerkung",
      textArea: true,
    },
    {
      title: "Reinigung",
      seperator: true,
    },
    {
      title: "Kf[m/s]",
    },
  ];
};

const Row = ({ title, textArea, select, checkbox }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="md:w-1/5 w-1/3">{title}:</span>
      {textArea && <Input.TextArea className="w-full" />}
      {select && <Select className="w-full" />}
      {checkbox && <Checkbox className="w-full flex justify-start" />}
      {!textArea && !select && !checkbox && <Input className="w-full" />}
    </div>
  );
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 600,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title="Summen">
      <div className="flex flex-col gap-2">
        {data.map((row, i) => (
          <>
            {row.seperator && <hr className="h-px bg-gray-100 border-0" />}
            <Row
              key={`seepage_details_${i}`}
              title={row.title}
              textArea={row.textArea}
              select={row.select}
              checkbox={row.checkbox}
            />
          </>
        ))}
      </div>
    </CustomCard>
  );
};

export default Details;