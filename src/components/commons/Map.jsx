import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card } from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { flaechen } from "../../stories/_data/rathausKassenzeichenfeatureCollection";
import {
  FeatureCollectionDisplay,
  MappingConstants,
  RoutedMap,
} from "react-cismap";
import { TopicMapStylingContext } from "react-cismap/contexts/TopicMapStylingContextProvider";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  createQueryGeomFromBB,
  getBoundsForFeatureArray,
  getCenterAndZoomForBounds,
} from "../../tools/mappingTools";
import {
  searchForGeoFields,
  storeFlaechenId,
  storeFrontenId,
} from "../../store/slices/search";
import {
  setFlaechenSelected,
  setFrontenSelected,
  setGeneralGeometrySelected,
  setLeafletElement,
} from "../../store/slices/mapping";
import { useDispatch } from "react-redux";
import { ScaleControl } from "react-leaflet";

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
  children,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();

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
  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
  const urlSearchParams = new URLSearchParams(browserlocation.search);
  const urlSearchParamsObject = paramsToObject(urlParams);
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

    return () => window.removeEventListener("resize", setSize);
  }, []);

  let refRoutedMap = useRef(null);

  const mapStyle = {
    width: mapWidth - 2 * padding,
    height: mapHeight - 2 * padding - headHeight,
    cursor: "pointer",
    clear: "both",
    zIndex: 1,
  };

  const defaults = {
    maxWidth: 200,
    metric: true,
    imperial: false,
    updateWhenIdle: false,
    position: "topleft",
  };

  let fallback = {};
  if (data?.featureCollection && refRoutedMap?.current) {
    const map = refRoutedMap.current.leafletMap.leafletElement;
    dispatch(setLeafletElement(map));

    const bb = getBoundsForFeatureArray(data?.featureCollection);
    const { center, zoom } = getCenterAndZoomForBounds(map, bb);
    fallback.position = {};
    fallback.position.lat = center.lat;
    fallback.position.lng = center.lng;
    fallback.zoom = zoom;
  }

  return (
    <Card
      size="small"
      hoverable={false}
      title={<span className="text-lg">Karte</span>}
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
        maxZoom={25}
        zoomSnap={0.5}
        zoomDelta={0.5}
        fallbackPosition={{
          lat:
            urlSearchParamsObject?.lat ??
            fallback?.position?.lat ??
            51.272570027476256,
          lng:
            urlSearchParamsObject?.lng ??
            fallback?.position?.lng ??
            7.19963690266013,
        }}
        fallbackZoom={urlSearchParamsObject?.zoom ?? fallback.zoom ?? 17}
        locationChangedHandler={(location) => {
          const newParams = { ...paramsToObject(urlParams), ...location };
          setUrlParams(newParams);
        }}
        boundingBoxChangedHandler={(boundingBox) => {
          const bbPoly = createQueryGeomFromBB(boundingBox);
          const zoom = refRoutedMap?.current?.leafletMap.viewport.zoom;

          if (zoom >= 18.5) {
            dispatch(searchForGeoFields(bbPoly));
          }
        }}
        ondblclick={(event) => {
          //if data contains a ondblclick handler, call it
          if (data.ondblclick) {
            data.ondblclick(event);
          }
        }}
      >
        <ScaleControl {...defaults} position="topleft" />
        {data.featureCollection && data.featureCollection.length > 0 && (
          <FeatureCollectionDisplay
            featureCollection={data.featureCollection}
            style={data.styler}
            markerStyle={data.markerStyle}
            showMarkerCollection={data.showMarkerCollection || false}
            featureClickHandler={
              data.featureClickHandler ||
              ((e) => {
                const feature = e.target.feature;
                if (feature.selected) {
                  const map = refRoutedMap.current.leafletMap.leafletElement;
                  const bb = getBoundsForFeatureArray([feature]);
                  const { center, zoom } = getCenterAndZoomForBounds(map, bb);
                  setUrlParams((prev) => {
                    prev.set("zoom", zoom);
                    prev.set("lat", center.lat);
                    prev.set("lng", center.lng);
                    return prev;
                  });
                } else {
                  switch (feature.featureType) {
                    case "flaeche": {
                      dispatch(storeFlaechenId(feature.id));
                      dispatch(setFlaechenSelected({ id: feature.id }));

                      break;
                    }
                    case "front": {
                      dispatch(storeFrontenId(feature.properties.id));
                      dispatch(
                        setFrontenSelected({ id: feature.properties.id })
                      );
                      break;
                    }
                    case "general": {
                      dispatch(
                        setGeneralGeometrySelected({
                          id: feature.properties.id,
                        })
                      );
                      break;
                    }
                    default: {
                      console.log(
                        "no featureClickHandler set",
                        e.target.feature
                      );
                    }
                  }
                }
              })
            }
          />
        )}
        {children}
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
