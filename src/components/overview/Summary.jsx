import { useSelector } from "react-redux";
import { getKassenzeichen } from "../../store/slices/search";
import CustomCard from "../ui/Card";

const extractor = (input) => {
  const data = input?.frontenArray?.map((front) => ({
    key:
      front.frontObject.frontinfoObject.lage_sr_satzung.strassenreinigung.key +
      "-" +
      front.frontObject.frontinfoObject.lage_sr_satzung.strassenreinigung
        .schluessel,
    streetNumber: front.frontObject.frontinfoObject.strasseObject.schluessel,
    streetName: front.frontObject.frontinfoObject.strasseObject.name,
    length: front.frontObject.frontinfoObject.laenge_grafik,
  }));

  return data;
};

const Summary = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="ESW Zusammenfassung">
      <div className="flex flex-col gap-2">
        {kassenzeichen?.frontenArray?.length > 0 && (
          <div className={`font-medium`}>Reinigung</div>
        )}
        {data?.map((front, i) => (
          <div
            key={`sum_items_${i}`}
            className="flex w-full items-center text-sm"
          >
            <div className="w-full">{front.key}</div>
            <div className="w-full">#{front.streetNumber}</div>
            <div className="w-full">{front.streetName}</div>
            <div className="w-1/2 text-right">{front.length}m</div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

export default Summary;
