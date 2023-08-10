import { useSelector } from "react-redux";
import CustomCard from "../ui/Card";
import { getKassenzeichen } from "../../store/slices/search";

const extractor = (kassenzeichen) => {
  return kassenzeichen?.kassenzeichen_geometrienArray?.map((geometry) => ({
    title: geometry.kassenzeichen_geometrieObject.name,
    status: "online",
  }));
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
  width = 300,
  height = 200,
  style,
  title = "Geometrien",
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);
  return (
    <CustomCard style={{ ...style, width, height }} title={title}>
      {data?.map((row, i) => (
        <Row key={`geometrics_${i}`} status={row.status} title={row.title} />
      ))}
    </CustomCard>
  );
};

export default Geometrics;
