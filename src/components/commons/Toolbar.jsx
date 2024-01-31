import { useSelector } from "react-redux";
import { getHoveredObject } from "../../store/slices/ui";

const Toolbar = ({ infoText }) => {
  const properties = useSelector(getHoveredObject);

  return (
    <div
      key={JSON.stringify({ ...properties, infoText })}
      className="relative mt-2 bg-white text-lg w-full z-[999] pointer-events-none flex gap-1"
    >
      {properties?.kassenzeichen && (
        <span>
          Kassenzeichen: {properties.kassenzeichen}::
          {properties.bezeichnung}
        </span>
      )}
      {properties?.kassenzeichen && properties.anschlussgrad && (
        <span>{" - "}</span>
      )}
      {properties?.anschlussgrad && <span>{properties.anschlussgrad}</span>}
      {infoText && <span className="text-gray-400">{infoText}</span>}
    </div>
  );
};

export default Toolbar;
