import { useDispatch, useSelector } from "react-redux";
import {
  getFeatureCollection,
  setFeatureHovered,
} from "../../store/slices/mapping";
import { FeatureCollectionDisplay } from "react-cismap";
import Toolbar from "./Toolbar";

const FeatureMapLayer = ({ featureTypes }) => {
  const dispatch = useDispatch();
  const featureCollection = useSelector(getFeatureCollection);
  const filteredCollection = featureCollection?.filter((item) =>
    featureTypes.includes(item.featureType)
  );
  const hoveredFeature = filteredCollection?.find(
    (feature) => feature.hovered === true
  );

  const myVirtHoverer = (feature) => {
    const mouseoverHov = (feature, e) => {
      dispatch(setFeatureHovered({ id: feature.id }));
    };

    const mouseoutHov = (feature, e) => {
      dispatch(setFeatureHovered({ id: undefined }));
    };

    return { mouseoverHov, mouseoutHov };
  };
  myVirtHoverer.virtual = true;

  return (
    <>
      {filteredCollection && (
        <>
          <FeatureCollectionDisplay
            key={"FlaechenLayer"}
            style={(feature) => {
              return {
                color: "#00000040", // stroke
                fillColor: "#00000020", //fill
                weight: feature.hovered ? feature.weight + 2 : feature.weight,
              };
            }}
            featureCollection={filteredCollection}
            hoverer={myVirtHoverer}
          />
          <Toolbar
            kassenzeichen={hoveredFeature?.properties?.kassenzeichen}
            anschlussgrad={hoveredFeature?.properties?.anschlussgrad}
            bezeichnung={hoveredFeature?.properties?.bezeichnung}
          />
        </>
      )}
    </>
  );
};

export default FeatureMapLayer;
