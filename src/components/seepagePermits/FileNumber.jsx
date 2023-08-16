import { useSelector } from "react-redux";
import { getKassenzeichen } from "../../store/slices/search";
import CustomCard from "../ui/Card";

const extractor = (kassenzeichen) => {
  const data =
    kassenzeichen?.kanalanschlussObject?.befreiungenunderlaubnisseArray?.map(
      (befreiungErlaubnis) => ({
        title:
          befreiungErlaubnis?.befreiungerlaubnisObject?.aktenzeichen +
          " (" +
          befreiungErlaubnis?.befreiungerlaubnisObject
            ?.befreiungerlaubnis_nutzung?.name +
          ")",
        data: befreiungErlaubnis?.befreiungerlaubnisObject?.befreiungerlaubnis_geometrieArrayRelationShip?.map(
          (relationship) => ({
            title:
              relationship?.befreiungerlaubnis_geometrie_typ_versickerung?.name,
            value: relationship?.durchfluss + " l/s",
          })
        ),
      })
    );

  return data;
};

const Row = ({ title, value }) => {
  return (
    <div>
      <div className="flex items-center w-full gap-1 px-8 text-zinc-500 text-sm">
        <span>{title}</span>|<span>{value}</span>
      </div>
      <hr className="h-px bg-gray-100 border-0" />
    </div>
  );
};

const FileNumber = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard
      style={{ ...style, width, height }}
      title="Aktenzeichen - Versickerung/Einleitung"
    >
      {data?.map((row, i) => (
        <div
          className="flex flex-col gap-2 w-full"
          key={`fileNumber_title_${i}`}
        >
          <div className="text-sm font-semibold">{row.title}</div>
          {row.data.map((item, i) => (
            <Row
              title={item.title}
              value={item.value}
              key={`fileNumber_item_${i}`}
            />
          ))}
        </div>
      ))}
    </CustomCard>
  );
};

export default FileNumber;
