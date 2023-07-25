import { Checkbox, Select } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [];
};

const Row = ({ title, data, useCheckbox }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full items-center gap-2 text-xs text-zinc-500">
        <span className="w-3/5"></span>
        <span className="text-center">vorh.</span>
        <span className="w-full text-center">{title}</span>
      </div>
      {data.map((item, i) => (
        <div
          className="flex w-full items-center gap-2"
          key={`${item.title}_${i}`}
        >
          <span className="w-3/5 font-semibold">{item.title}:</span>
          <Checkbox />
          {useCheckbox ? (
            <Checkbox className="w-full flex justify-center" />
          ) : (
            <Select className="w-full" />
          )}
        </div>
      ))}
    </div>
  );
};

const SewerConnection = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <CustomCard style={{ ...style, width, height }} title="Kanalanschluss">
      <div className="flex flex-col gap-6">
        <Row
          title="angeschlossen"
          data={[
            { title: "RK" },
            { title: "MRK" },
            { title: "MKS" },
            { title: "SK" },
          ]}
        />
        <Row
          title="Entleerung"
          data={[{ title: "SK" }, { title: "KKA" }, { title: "EVG" }]}
          useCheckbox
        />
      </div>
    </CustomCard>
  );
};

export default SewerConnection;
