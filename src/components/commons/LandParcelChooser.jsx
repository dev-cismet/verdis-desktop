import { Select } from "antd";

const LandParcelChooser = () => {
  return (
    <div className="absolute bottom-2 left-2 z-[999]">
      <Select className="w-40" placeholder="Gemarkung" />
      <Select className="w-40" placeholder="Flur" />
      <Select className="w-40" placeholder="Flurstück" />
    </div>
  );
};

export default LandParcelChooser;
