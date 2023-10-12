import { useSelector } from "react-redux";
import {
  getFeatureCollection,
  getShowBackground,
  getShowCurrentFeatureCollection,
} from "../../store/slices/mapping";
import { FeatureCollectionDisplay } from "react-cismap";
import Toolbar from "./Toolbar";
import { useState } from "react";

const FeatureMapLayer = ({ featureTypes }) => {
  const featureCollection = useSelector(getFeatureCollection);
  const showForeGround = useSelector(getShowCurrentFeatureCollection);
  const showBackGround = useSelector(getShowBackground);
  const filteredCollection = featureCollection?.filter((item) =>
    featureTypes.includes(item.featureType)
  );
  const [hoveredFeature, setHoveredFeature] = useState(undefined);

  const myVirtHoverer = () => {
    const mouseoverHov = (feature) => {
      setHoveredFeature(feature);
    };

    const mouseoutHov = () => {
      setHoveredFeature(undefined);
    };

    return { mouseoverHov, mouseoutHov };
  };
  myVirtHoverer.virtual = true;

  return (
    <>
      {filteredCollection && (
        <>
          <FeatureCollectionDisplay
            key={"FlaechenLayer-" + showForeGround}
            style={(feature) => {
              return {
                color: showBackGround ? "#00000040" : "#00000000", // stroke
                fillColor: showBackGround ? "#00000020" : "#00000000", //fill
                weight:
                  feature?.id === hoveredFeature?.id
                    ? feature.weight + 2
                    : feature.weight,
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
