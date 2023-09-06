import React from "react";
import Map from "../components/commons/Map";
import General from "../components/overview/General";
import Statistics from "../components/overview/Statistics";
import CrossReferences from "../components/overview/CrossReferences";
import Sums from "../components/sealedSurfaces/Sums";
import Summary from "../components/overview/Summary";
import InfoBar from "../components/commons/InfoBar";
import {
  generalExtractor,
  statisticsExtractor,
  summaryExtractor,
  sumsExtractor,
} from "../tools/extractors";
import { getKassenzeichen } from "../store/slices/search";
import { useSelector } from "react-redux";
import {
  createStyler,
  getFlaechenFeatureCollection,
  getMarkerStyleFromFeatureConsideringSelection,
} from "../tools/mappingTools";
import {
  getFlaechenCollection,
  getFrontenCollection,
  getGeneralGeometryCollection,
} from "../store/slices/mapping";
import { getOverviewFeatureTypes } from "../store/slices/ui";

const Page = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const cardStyle = {
    width: "100%",
    height: "100%",
  };
  const kassenzeichen = useSelector(getKassenzeichen);
  const flaechenArray = useSelector(getFlaechenCollection);
  const frontenArray = useSelector(getFrontenCollection);
  const generalGeomArray = useSelector(getGeneralGeometryCollection);
  const overviewFeatureTypes = useSelector(getOverviewFeatureTypes) || [];

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Übersicht" className="py-1" />

        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full max-h-[calc(100%-40px)]">
          <General
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
            extractor={generalExtractor}
          />
          <Statistics
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
            extractor={statisticsExtractor}
          />
          <CrossReferences
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
          />
          <Sums
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
            extractor={sumsExtractor}
          />
          <div className="col-span-2 row-span-2">
            <Map
              key={"sdjfhg"}
              width={"calc(100%-40px)"}
              height={"100%"}
              dataIn={kassenzeichen}
              extractor={(dataIn) => {
                if (dataIn !== undefined && JSON.stringify(dataIn) !== "{}") {
                  const featureArray = [];

                  if (overviewFeatureTypes.includes("front")) {
                    //add frontenArray to featureArray
                    featureArray.push(...frontenArray);
                  }

                  if (overviewFeatureTypes.includes("general")) {
                    //add generalGeomArray to featureArray
                    featureArray.push(...generalGeomArray);
                  }
                  if (overviewFeatureTypes.includes("flaeche")) {
                    //add flaechenArray to featureArray
                    featureArray.push(...flaechenArray);
                  }

                  const featureCollections = [];

                  let featureCollection;
                  if (featureArray.length > 0) {
                    featureCollection = featureArray;
                  }

                  return {
                    homeCenter: [51.272570027476256, 7.19963690266013],
                    featureCollection,
                    styler: createStyler(false, featureArray),
                    markerStyle: getMarkerStyleFromFeatureConsideringSelection,
                    showMarkerCollection: false,
                  };
                }

                return {
                  homeCenter: [51.272570027476256, 7.19963690266013],
                  homeZoom: 16,
                  featureCollection: undefined,
                };
              }}
            />
          </div>
          <Summary
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle}
            extractor={summaryExtractor}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
