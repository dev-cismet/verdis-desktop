import { useDispatch, useSelector } from "react-redux";
import {
  getSyncKassenzeichen,
  setSyncKassenzeichen,
} from "../../store/slices/settings";
import { Checkbox, Radio, Slider, Switch } from "antd";
import { useContext } from "react";
import {
  TopicMapStylingContext,
  TopicMapStylingDispatchContext,
} from "react-cismap/contexts/TopicMapStylingContextProvider";

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

  const { activeAdditionalLayerKeys, selectedBackground } = useContext(
    TopicMapStylingContext
  );

  const { setActiveAdditionalLayerKeys, setSelectedBackground } = useContext(
    TopicMapStylingDispatchContext
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
          title="Gebäude"
          onClick={() => {
            if (activeAdditionalLayerKeys?.includes("nrwAlkisGebaeude")) {
              // remove it from the array

              setActiveAdditionalLayerKeys(
                activeAdditionalLayerKeys.filter(
                  (item) => item !== "nrwAlkisGebaeude"
                )
              );
            } else {
              setActiveAdditionalLayerKeys([
                ...(activeAdditionalLayerKeys || []),
                "nrwAlkisGebaeude",
              ]);
            }
          }}
        >
          <div className="w-10/12 flex justify-between items-center">
            <Checkbox
              checked={activeAdditionalLayerKeys?.includes("nrwAlkisGebaeude")}
            />
            <Slider defaultValue={20} disabled={false} className="w-3/4" />
          </div>
        </SettingsRow>
        <SettingsRow
          title="Flurstücke"
          onClick={() => {
            if (activeAdditionalLayerKeys?.includes("nrwAlkisFstck")) {
              // remove it from the array

              setActiveAdditionalLayerKeys(
                activeAdditionalLayerKeys.filter(
                  (item) => item !== "nrwAlkisFstck"
                )
              );
            } else {
              setActiveAdditionalLayerKeys([
                ...(activeAdditionalLayerKeys || []),
                "nrwAlkisFstck",
              ]);
            }
          }}
        >
          <div className="w-10/12 flex justify-between items-center">
            <Checkbox
              checked={activeAdditionalLayerKeys?.includes("nrwAlkisFstck")}
            />
            <Slider defaultValue={20} disabled={false} className="w-3/4" />
          </div>
        </SettingsRow>
        <Radio.Group
          onChange={(e) => setSelectedBackground(e.target.value)}
          value={selectedBackground}
        >
          <div className="flex flex-col gap-2">
            <Radio value="stadtplan">Stadtplan</Radio>
            <Radio value="lbk">Lbk</Radio>
            <Radio value="ortho">Ortho</Radio>
            <Radio value="default">Standard</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Settings;
