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
  mappingExtractor,
  statisticsExtractor,
  summaryExtractor,
  sumsExtractor,
} from "../tools/extractors";
import {
  getKassenzeichen,
  searchForKassenzeichen,
  searchForKassenzeichenWithPoint,
} from "../store/slices/search";
import { useDispatch, useSelector } from "react-redux";

import {
  getBefreiungErlaubnisCollection,
  getFeatureCollection,
  getFlaechenCollection,
  getFrontenCollection,
  getGeneralGeometryCollection,
  setFeatureHovered,
} from "../store/slices/mapping";
import { getOverviewFeatureTypes } from "../store/slices/ui";
import { convertLatLngToXY } from "../tools/mappingTools";
import { useSearchParams } from "react-router-dom";
import { FeatureCollectionDisplay } from "react-cismap";

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
  const befreiungErlaubnisseArray = useSelector(
    getBefreiungErlaubnisCollection
  );
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();
  const featureCollection = useSelector(getFeatureCollection);

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
              key={"overview.map"}
              width={"calc(100%-40px)"}
              height={"100%"}
              dataIn={{
                kassenzeichen,
                flaechenArray,
                frontenArray,
                generalGeomArray,
                befreiungErlaubnisseArray,
                shownFeatureTypes: overviewFeatureTypes,
                ondblclick: (event) => {
                  console.log(
                    "xxx event.öatlng",
                    convertLatLngToXY(event.latlng)
                  );
                  const xy = convertLatLngToXY(event.latlng);
                  dispatch(
                    searchForKassenzeichenWithPoint(
                      xy[0],
                      xy[1],
                      urlParams,
                      setUrlParams
                    )
                  );
                },
              }}
              extractor={mappingExtractor}
              hoveredFeature={featureCollection?.find(
                (feature) => feature.hovered === true
              )}
            >
              {featureCollection && (
                <FeatureCollectionDisplay
                  key={"FrontenLayer"}
                  style={(feature) => {
                    switch (feature.featureType) {
                      case "flaeche":
                        return {
                          color: "#00000040", // stroke
                          fillColor: "#00000020", //fill
                          weight: feature.hovered ? 2 : 0.5,
                        };
                      case "front":
                        return {
                          color: "#00000040", // stroke
                          fillColor: "#00000020", //fill
                          weight: feature.hovered ? 12 : 10,
                        };
                    }
                  }}
                  featureCollection={featureCollection.filter(
                    (item) =>
                      item.featureType === "front" ||
                      item.featureType === "flaeche"
                  )}
                  hoverer={myVirtHoverer}
                />
              )}
            </Map>
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
