import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCard from "../ui/Card";
import { faHandPointer, faMap } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import {
  getAenderungsAnfrage,
  getKassenzeichen,
} from "../../store/slices/search";

const extractor = (kassenzeichen, aenderungsAnfrage) => {
  return [
    {
      value: kassenzeichen?.flaechenArray?.length,
      title: "Flächen",
    },
    {
      value: kassenzeichen?.frontenArray?.length,
      title: "Fronten",
    },
    {
      value:
        kassenzeichen?.kanalanschlussObject?.befreiungenunderlaubnisseArray
          ?.length,
      title: "Versickerungsgenehmigungen",
    },
    {
      value: kassenzeichen?.kassenzeichen_geometrienArray?.length,
      title: "Geometrien",
    },
    {
      value: aenderungsAnfrage?.length,
      title: "Änderungsanfragen",
    },
  ];
};

const Statistics = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const aenderungsAnfrage = useSelector(getAenderungsAnfrage);
  const data = extractor(kassenzeichen, aenderungsAnfrage);

  return (
    <CustomCard style={{ ...style, width, height }} title="Statistik">
      <div className="flex flex-col gap-4 text-sm font-medium">
        {data.map((row, i) => (
          <div key={`statistics_row_${i}`} className="flex gap-2 items-center">
            <span>{row.value || 0}</span>
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
