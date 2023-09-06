import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCard from "../ui/Card";
import { faHandPointer, faMap } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getAenderungsAnfrage,
  getKassenzeichen,
} from "../../store/slices/search";
import {
  getOverviewFeatureTypes,
  setOverviewFeatureTypes,
} from "../../store/slices/ui";

const mockExtractor = (kassenzeichen, aenderungsAnfrage) => {
  return [];
};

const Statistics = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const aenderungsAnfrage = useSelector(getAenderungsAnfrage);
  const data = extractor(kassenzeichen, aenderungsAnfrage);
  const overviewFeatureTypes = useSelector(getOverviewFeatureTypes) || [];
  const dispatch = useDispatch();
  return (
    <CustomCard style={{ ...style, width, height }} title="Statistik">
      <div className="flex flex-col gap-1 text-sm font-medium">
        {data.map((row, i) => {
          console.log("xxx row", row);

          const toggle = (featureType) => {
            const ft = overviewFeatureTypes;
            if (ft.includes(featureType)) {
              dispatch(
                setOverviewFeatureTypes(ft.filter((ft) => ft !== featureType))
              );
            } else {
              dispatch(setOverviewFeatureTypes([...ft, featureType]));
            }
          };
          return (
            <div
              key={`statistics_row_${i}`}
              className={`flex gap-2 items-center py-1 hover:bg-zinc-100 ${
                row.value ? "" : "hidden"
              }`}
              onClick={() => {
                if (row.title === "Flächen") {
                  toggle("flaeche");
                } else if (row.title === "Fronten") {
                  toggle("front");
                } else if (row.title === "Geometrien") {
                  toggle("general");
                }
              }}
            >
              <span>{row.value}</span>
              <span className="w-full">{row.title}</span>
              <FontAwesomeIcon
                icon={faHandPointer}
                className="cursor-pointer"
              />
              <FontAwesomeIcon icon={faMap} className="cursor-pointer" />
            </div>
          );
        })}
      </div>
    </CustomCard>
  );
};

export default Statistics;
