import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent.js";
import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card } from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import FeatureCollection from "react-cismap/FeatureCollection";
import { flaechen } from "../../stories/_data/rathausKassenzeichenfeatureCollection";
import {
  FeatureCollectionDisplay,
  MappingConstants,
  RoutedMap,
} from "react-cismap";
import { TopicMapStylingContext } from "react-cismap/contexts/TopicMapStylingContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { modifyQueryPart } from "react-cismap/tools/routingHelper";
import bbox from "@turf/bbox";
import {
  fitFeatureArray,
  getBoundsForFeatureArray,
} from "../../tools/mappingTools";

const mockExtractor = (input) => {
  return {
    homeCenter: [51.27225612927373, 7.199918031692506],
    homeZoom: 16,
    featureCollection: flaechen,
  };
};

const Map = ({
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 500,
}) => {
  const navigate = useNavigate();

  const data = extractor(dataIn);
  const padding = 5;
  const headHeight = 37;
  const cardRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);
  const {
    backgroundModes,
    selectedBackground,
    baseLayerConf,
    backgroundConfigurations,
    additionalLayerConfiguration,
    activeAdditionalLayerKeys,
  } = useContext(TopicMapStylingContext);
  let backgroundsFromMode;
  const browserlocation = useLocation();

  const urlSearchParams = new URLSearchParams(browserlocation.search);

  try {
    backgroundsFromMode = backgroundConfigurations[selectedBackground].layerkey;
  } catch (e) {}

  const _backgroundLayers = backgroundsFromMode || "rvrGrau@40";

  useEffect(() => {
    setMapWidth(cardRef?.current?.offsetWidth);
    setMapHeight(cardRef?.current?.offsetHeight);

    const setSize = () => {
      setMapWidth(cardRef?.current?.offsetWidth);
      setMapHeight(cardRef?.current?.offsetHeight);
    };

    window.addEventListener("resize", setSize);

    console.log("xxx first load", data?.featureCollection);
    if (data?.featureCollection && refRoutedMap?.current) {
      fitFeatureArray(data?.featureCollection, refRoutedMap);
    }

    return () => window.removeEventListener("resize", setSize);
  }, []);
  let refRoutedMap = useRef(null);

  const mapStyle = {
    width: mapWidth - 2 * padding,
    height: mapHeight - 2 * padding - headHeight,
    cursor: "pointer",
    clear: "both",
  };

  return (
    <Card
      size="small"
      hoverable={false}
      title={<span>Karte</span>}
      style={{
        width: width,
        height: height,
      }}
      bodyStyle={{ padding }}
      headStyle={{ backgroundColor: "white" }}
      type="inner"
      ref={cardRef}
    >
      <RoutedMap
        editable={false}
        style={mapStyle}
        key={"leafletRoutedMap"}
        backgroundlayers={_backgroundLayers}
        urlSearchParams={urlSearchParams}
        layers=""
        referenceSystem={MappingConstants.crs3857}
        referenceSystemDefinition={MappingConstants.proj4crs3857def}
        ref={refRoutedMap}
        minZoom={11}
        maxZoom={22}
        zoomSnap={0.5}
        zoomDelta={0.5}
        fallbackPosition={{
          lat: data.homeCenter[0],
          lng: data.homeCenter[1],
        }}
        fallbackZoom={data.homeZoom}
        locationChangedHandler={(location) => {
          navigate(modifyQueryPart(browserlocation.search, location));
        }}
        boundingBoxChangedHandler={(boundingBox) => {
          // console.log("xxx boundingBox Changed", boundingBox);
        }}
      >
        <FeatureCollectionDisplay
          featureCollection={data.featureCollection}
          style={data.styler}
        />
      </RoutedMap>
    </Card>
  );
};
export default Map;

Map.propTypes = {
  /**
   * The width of the map
   */
  width: PropTypes.number,

  /**
   * The height of the map
   */
  height: PropTypes.number,

  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,

  /**
   * The style of the map
   */
  mapStyle: PropTypes.object,
};
