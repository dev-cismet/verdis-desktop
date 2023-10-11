import { useDispatch, useSelector } from "react-redux";
import {
  getSyncKassenzeichen,
  setSyncKassenzeichen,
} from "../../store/slices/settings";
import {
  getShowCurrentFeatureCollection,
  setShowCurrentFeatureCollection,
} from "../../store/slices/mapping";
import { Switch } from "antd";

const Settings = () => {
  const dispatch = useDispatch();
  const syncKassenzeichen = useSelector(getSyncKassenzeichen);
  const showCurrentFeatureCollection = useSelector(
    getShowCurrentFeatureCollection
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3>Allgemein</h3>
        <div
          className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
          onClick={() => dispatch(setSyncKassenzeichen(!syncKassenzeichen))}
        >
          <span>Kassenzeichen mit Java Anwendung synchronisieren</span>
          <Switch className="w-fit" checked={syncKassenzeichen} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Karte</h3>
        <div
          className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
          onClick={() =>
            dispatch(
              setShowCurrentFeatureCollection(!showCurrentFeatureCollection)
            )
          }
        >
          <span>Vordergrund anzeigen</span>
          <Switch className="w-fit" checked={showCurrentFeatureCollection} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
