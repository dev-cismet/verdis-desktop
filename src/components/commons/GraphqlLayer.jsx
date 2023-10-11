import { FeatureCollectionDisplay } from "react-cismap";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";
import { geoFieldsQuery } from "../../constants/verdis";
import { createQueryGeomFromBB } from "../../tools/mappingTools";
import { getArea25832 } from "../../tools/kassenzeichenMappingTools";

const FeatureMapLayer = ({
  boundingBox,
  filter = (item) => true,
  mouseOverListener = (feature) => {},
  itemQuery,
  url,
  featureFactory = () => [],
  jwt,
  maxArea = 1000000,
}) => {
  const [featureCollection, setFeatureCollection] = useState([]);
  const [hoveredFeature, setHoveredFeature] = useState(undefined);
  console.log("boundingBox", boundingBox);
  const bb = JSON.stringify(boundingBox);

  useEffect(
    () => {
      console.log("yyy useEffect");

      const bbPoly = createQueryGeomFromBB(boundingBox);
      const area = getArea25832(bbPoly);
      if (area > maxArea) {
        setFeatureCollection([]);
        return;
      } else {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            query: itemQuery,
            variables: { bbPoly },
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            console.log("loaded", result);
            const fc = featureFactory(result.data);
            const filteredCollection = fc?.filter(filter);
            setFeatureCollection(filteredCollection);
            console.log("loaded", filteredCollection);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error.message
            );
          });
      }
    },
    boundingBox,
    bb,
    jwt,
    itemQuery,
    url
  );

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
      {featureCollection && (
        <>
          <FeatureCollectionDisplay
            key={"FlaechenLayer"}
            style={(feature) => {
              return {
                color: "#00000040", // stroke
                fillColor: "#00000020", //fill
                weight:
                  feature?.id === hoveredFeature?.id
                    ? feature.weight + 2
                    : feature.weight,
              };
            }}
            featureCollection={featureCollection}
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
