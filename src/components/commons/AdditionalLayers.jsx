import { MappingConstants } from "react-cismap";
import CismapLayer from "react-cismap/CismapLayer";
import { REST_SERVICE_WUNDA } from "../../constants/verdis";
import { concat, flatten } from "lodash";
import { reproject } from "reproject";
import { projectionData } from "react-cismap/constants/gis";
import proj4 from "proj4";
import getArea from "@turf/area";

const getWGS84GeoJSON = (geoJSON) => {
  try {
    const reprojectedGeoJSON = reproject(
      geoJSON,
      projectionData["25832"].def,
      proj4.WGS84
    );

    return reprojectedGeoJSON;
  } catch (e) {
    return undefined;
  }
};

const getArea25832 = (geoJSON) => {
  const wGS84GeoJSON = getWGS84GeoJSON(geoJSON);

  if (wGS84GeoJSON !== undefined) {
    return getArea(wGS84GeoJSON);
  }
};
const createKassenzeichenFlaechenFeatureArray = (data) => {
  const result = [];
  data.kassenzeichen.forEach((kassenzeichen) => {
    kassenzeichen.flaechenArray.forEach((f) => {
      const flaeche = f.flaecheObject;
      try {
        const feature = {
          type: "Feature",
          featureType: "flaeche",
          id:
            kassenzeichen.kassenzeichennummer8 +
            "_" +
            flaeche.flaechenbezeichnung,
          hovered: false,
          weight: 0.5,
          geometry: flaeche.flaecheninfoObject.geom.geo_field,
          properties: {
            kassenzeichen: kassenzeichen.kassenzeichennummer8,
            bezeichnung: flaeche.flaechenbezeichnung,
            anschlussgrad: flaeche.flaecheninfoObject.anschlussgradObject.grad,
          },
          crs: {
            type: "name",
            properties: {
              name: "urn:ogc:def:crs:EPSG::25832",
            },
          },
        };
        result.push(feature);
      } catch (e) {
        console.log("xxx error", e);
      }
    });
  });
  return result;
};

export const configuration = {
  bplan: {
    initialActive: false,
    title: "Bebauungsplanverfahren (rechtsverb.)",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de/bebauungsplanung/services",
      layers: "bverfahren-r",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  baulastnachweis: {
    initialActive: false,
    title: "Baulastnachweis",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:8056/baulasten/services",
      layers: "baul",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
      pane: "additionalLayers1",
    },
  },
  hausnummern: {
    initialActive: false,
    title:
      "Hausnummern, vorhandene Adressen, geplante Adressen mit/ohne Bauantrag",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/alkis/services",
      layers: "hausnr,hausnrne,hausnrplm,hausnrplo",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  stadtFstck: {
    initialActive: false,
    title: "Städt. Flurstücke",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/stadt-flurstuecke/services",
      layers: "stadt_flurst",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
      pane: "additionalLayers1",
    },
  },
  eswReinigungsklassen: {
    initialActive: false,
    title: "ESW Reinigungsklassen",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:8099/esw/services",
      layers: "esw",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  hohenlinien: {
    initialActive: false,
    title: "1m Höhenlinien",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/hoehen/services",
      layers: "hoehenu",
      styles: "sepia",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  expresskarte: {
    initialActive: false,
    title: "Expresskarte (Strich s/w)",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/alkis/services",
      layers: "expsw",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  expresskarteGelb: {
    initialActive: false,
    title: "Expresskarte (Strich gelb)",
    conf: {
      type: "wmts",
      url: "http://s10221.wuppertal-intra.de:7098/alkis/services",
      layers: "expg",
      version: "1.1.1",
      tileSize: 256,
      transparent: true,
      format: "image/png",
    },
  },
  kanal: {
    initialActive: false,
    title: "Kanal",
    conf: {
      type: "vector",
      style: "https://omt.map-hosting.de/styles/kanal/style.json",
      pane: "additionalLayers1",
      offlineAvailable: false,
      offlineDataStoreKey: "kanal",
    },
  },
  // kanaldaten: {
  //   initialActive: false,
  //   title: "Kanaldaten",
  //   conf: {
  //     type: "wmts",
  //     url: "http://s10221.wuppertal-intra.de:7098/alkis/services",
  //     layers: "expg",
  //     version: "1.1.1",
  //     tileSize: 256,
  //     transparent: true,
  //     format: "image/png",
  //   },
  // },
  versiegelteFlaechen: {
    initialActive: false,
    title: "VerdIS Flächen",
    conf: {
      type: "graphql",
      pane: "vectorLayers",
      referenceSystemDefinition: MappingConstants.proj4crs3857def,
      query: `
      query geoFields($bbPoly: geometry) {
        kassenzeichen(where: {flaechenArray: {flaecheObject: {flaecheninfoObject: {geom: {geo_field: {_st_intersects: $bbPoly}}}}}}) {
          kassenzeichennummer8
          flaechenArray {
            flaecheObject {
              id
              flaechenbezeichnung
              flaecheninfoObject {
                geom {
                  geo_field
                }
                id
                anschlussgradObject {
                  grad
                }
              }
            }
          }
        }
      }`,
      endpoint: REST_SERVICE_WUNDA + "/graphql/VERDIS_GRUNDIS/execute",
      fetchAllowed: (bbPoly) => {
        const area = getArea25832(bbPoly);
        const maxAreaForSearch = 130000;

        return area < maxAreaForSearch && area !== 0;
      },
      style: {
        color: "#666666",
        fillColor: "#262626",
        weight: 0.5,
      },
      hoveredStyle: {
        color: "#666666",
        fillColor: "#666666",
        weight: 1,
      },
      useHover: true,
      createFeature: createKassenzeichenFlaechenFeatureArray,
      // ---- Events ----
      onMouseOver: (feature) => {
        // setHoveredProperties(feature.properties);
      },
      onMouseOut: () => {
        // setHoveredProperties({});
      },
      onStatus: (status) => {
        // console.log("statusxx", status);
      },
    },
  },
};

export default function AdditionalLayers({
  activeLayers = [],
  opacities = {},
  mapRef,
  jwt,
  onHoverUpdate,
  onGraphqlLayerStatus = (status) => {},
}) {
  return (
    <>
      {activeLayers.map((layerKey, index) => {
        const layerConf = configuration[layerKey];

        if (layerConf) {
          let moreProps = {};
          if (layerConf.conf.type === "graphql") {
            moreProps.jwt = jwt;
            moreProps.mapRef = mapRef;
            moreProps.onMouseOut = () => {
              onHoverUpdate({});
            };
            moreProps.onMouseOver = (feature) => {
              onHoverUpdate(feature.properties);
            };
            moreProps.onStatus = onGraphqlLayerStatus;
          }

          return (
            <CismapLayer
              key={"Cismapayer." + index}
              //   if a key is set in the config it will overwrite the simple key above
              {...{
                ...layerConf.conf,
                opacity: opacities[layerKey] || 1,
                ...moreProps,
              }}
            ></CismapLayer>
          );
        }
      })}
    </>
  );
}
