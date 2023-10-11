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

const SettingsRow = ({ onClick, title, children }) => {
  return (
    <div
      className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
      onClick={onClick}
    >
      <span>{title}</span>
      {children}
    </div>
  );
};

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
        <SettingsRow
          onClick={() => dispatch(setSyncKassenzeichen(!syncKassenzeichen))}
          title="Kassenzeichen mit Java Anwendung synchronisieren"
        >
          <Switch className="w-fit" checked={syncKassenzeichen} />
        </SettingsRow>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Karte</h3>
        <SettingsRow
          onClick={() =>
            dispatch(
              setShowCurrentFeatureCollection(!showCurrentFeatureCollection)
            )
          }
          title="Vordergrund anzeigen"
        >
          <Switch className="w-fit" checked={showCurrentFeatureCollection} />
        </SettingsRow>
      </div>
    </div>
  );
};

export default Settings;
