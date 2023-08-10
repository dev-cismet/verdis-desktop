import { useSelector } from "react-redux";
import CustomCard from "../ui/Card";
import { getKassenzeichen } from "../../store/slices/search";

const extractor = (kassenzeichen) => {
  const data = kassenzeichen?.flaechenArray?.map((flaeche) => ({
    size: flaeche?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: flaeche?.flaecheObject?.flaecheninfoObject?.flaechenartObject
      ?.art_abkuerzung,
    connection:
      flaeche?.flaecheObject?.flaecheninfoObject?.anschlussgradObject
        ?.grad_abkuerzung,
  }));

  const typeSizeMap = new Map();
  const connectionSizeMap = new Map();

  data?.forEach((obj) => {
    const { type, connection, size } = obj;

    if (!typeSizeMap.has(type)) {
      typeSizeMap.set(type, 0);
    }
    typeSizeMap.set(type, typeSizeMap.get(type) + size);

    if (!connectionSizeMap.has(connection)) {
      connectionSizeMap.set(connection, 0);
    }
    connectionSizeMap.set(connection, connectionSizeMap.get(connection) + size);
  });

  const types = Array.from(typeSizeMap, ([type, size]) => ({ type, size }));
  const connections = Array.from(connectionSizeMap, ([type, size]) => ({
    type,
    size,
  }));

  return [
    {
      title: "Bewertung",
      items: types,
    },
    {
      title: "Anschlussgrad",
      items: connections,
    },
  ];
};

const Sums = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="Summen">
      {data.map((categories, i) => (
        <div
          key={`sum_categories_${i}`}
          className="flex flex-col gap-1 text-sm 3xl:text-base"
        >
          <div className={`font-semibold ${i > 0 && "pt-4"}`}>
            {categories.items.length > 0 && categories.title}
          </div>
          {categories.items.map((item, i) => (
            <div
              key={`sum_items_${i}`}
              className="flex justify-between w-full items-center"
            >
              <div>{item.type}</div>
              <div>{item.size} m²</div>
            </div>
          ))}
        </div>
      ))}
    </CustomCard>
  );
};

export default Sums;
