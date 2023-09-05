import bbox from "@turf/bbox";
import proj4 from "proj4";
import L from "leaflet";

export const getFlaechenFeatureCollection = (kassenzeichen) => {
  // Extract the flaechenArray from the response
  const flaechenArray = kassenzeichen.flaechenArray;

  // Map through the flaechenArray to create the features
  const features = flaechenArray.map((flaeche) => {
    return {
      type: "Feature",
      featureType: "flaeche",
      id: flaeche.flaecheObject.id,
      geometry: flaeche.flaecheObject.flaecheninfoObject.geom.geo_field,
      crs: flaeche.flaecheObject.flaecheninfoObject.geom.geo_field.crs,
      properties: {
        id: "flaeche." + flaeche.flaecheObject.id,
        bez: flaeche.flaecheObject.flaechenbezeichnung,
        art_abk:
          flaeche.flaecheObject.flaecheninfoObject.flaechenartObject
            .art_abkuerzung,
        flaechenart:
          flaeche.flaecheObject.flaecheninfoObject.flaechenartObject.art,
        anschlussgrad:
          flaeche.flaecheObject.flaecheninfoObject.anschlussgradObject.grad,
        groesse: flaeche.flaecheObject.flaecheninfoObject.groesse_aus_grafik,
        groesse_korrektur:
          flaeche.flaecheObject.flaecheninfoObject.groesse_korrektur,
        geom: undefined, // Exclude the geom in the properties
      },
    };
  });

  return features;
};

export const getFrontenFeatureCollection = (kassenzeichen) => {
  // extract the frontenArray from the response
  const frontenArray = kassenzeichen.frontenArray;
  const features = frontenArray.map((front) => {
    const frontObject = front.frontObject;
    return {
      type: "Feature",
      featureType: "front",
      id: "front." + frontObject.frontinfoObject.id,
      geometry: frontObject.frontinfoObject.geom.geo_field,
      crs: frontObject.frontinfoObject.geom.geo_field.crs,
      properties: {
        id: frontObject.frontinfoObject.id,
        strassenreinigung: frontObject.frontinfoObject.strassenreinigung,
        winterdienst: frontObject.frontinfoObject.winterdienst,
        wd_prio_or: frontObject.frontinfoObject.wd_prio_or,
        sr_klasse_or: frontObject.frontinfoObject.sr_klasse_or,
        strasse: frontObject.frontinfoObject.strasseObject,
      },
    };
  });

  return features;
};

export const getGeneralGeomfeatureCollection = (kassenzeichen) => {
  // extract the general Geom Array from the response

  const generalGeomArray = kassenzeichen.kassenzeichen_geometrienArray;

  const features = generalGeomArray.map((geom) => {
    const geomObject = geom.kassenzeichen_geometrieObject;
    return {
      type: "Feature",
      featureType: "general",
      id: "general." + geom.id,
      geometry: geomObject.geom.geo_field,
      crs: geomObject.geom.geo_field.crs,
      properties: {
        id: geom.id,
        name: geomObject.name,
        isfrei: geomObject.isfrei,
      },
    };
  });

  return features;
};

export const fitFeatureArray = (featureArray, mapRef) => {
  const bounds = getBoundsForFeatureArray(featureArray);
  console.log("xxx fitFeatureArray bounds", bounds);
  //ugly winning to avoid some race condition
  setTimeout(() => {
    mapRef.current.leafletMap.leafletElement.fitBounds(bounds);
  }, 1000);
};

export const getBoundsForFeatureArray = (featureArray) => {
  // Convert your featureArray into a FeatureCollection
  const featureCollection = {
    type: "FeatureCollection",
    features: featureArray,
  };
  return getBoundsForFeatureCollection(featureCollection);
};

export const getBoundsForFeatureCollection = (featureCollection) => {
  // Get bbox in EPSG:3857 from Turf.js
  const boundingBox3857 = bbox(featureCollection);

  // Convert the bounding box from EPSG:3857 to EPSG:4326
  const southWest4326 = proj4("EPSG:25832", "EPSG:4326", [
    boundingBox3857[0],
    boundingBox3857[1],
  ]);
  const northEast4326 = proj4("EPSG:25832", "EPSG:4326", [
    boundingBox3857[2],
    boundingBox3857[3],
  ]);

  // Return Leaflet LatLngBounds
  return L.latLngBounds(
    L.latLng(southWest4326[1], southWest4326[0]), // southwest corner
    L.latLng(northEast4326[1], northEast4326[0]) // northeast corner
  );
};

export function convertBBox2Bounds(bbox, refDef = proj4crs25832def) {
  const projectedNE = proj4(refDef, proj4.defs("EPSG:4326"), [
    bbox[0],
    bbox[1],
  ]);
  const projectedSW = proj4(refDef, proj4.defs("EPSG:4326"), [
    bbox[2],
    bbox[3],
  ]);
  return [
    [projectedNE[1], projectedSW[0]],
    [projectedSW[1], projectedNE[0]],
  ];
}
export const getCenterAndZoomForBounds = (map, bounds) => {
  const center = bounds.getCenter();
  const zoom = map.getBoundsZoom(bounds); // Returns the maximum zoom level on which the given bounds fit to the map view in its entirety. If inside is set to true, it instead returns the minimum zoom level on which the map view fits into the given bounds in its entirety.
  return { center, zoom };
};

export const getColorFromFlaechenArt = (art_abk) => {
  let color = "#ff0000";
  switch (art_abk) {
    case "DF":
    case "Dachfläche":
      color = "#a24c29";
      break;
    case "GDF":
    case "Gründach":
      color = "#6a7a17";
      break;
    case "VF":
    case "versiegelte Fläche":
      color = "#788180";
      break;
    case "VFS":
    case "städtische Straßenfläche":
      color = "#8a8684";
      break;
    case "LVS":
    case "leicht versiegelte Straßenfläche":
      color = "#7e5b47";
      break;
    case "LVF":
    case "leicht versiegelte Fläche":
      color = "#9f9b6c";
      break;
    case "VV":
    case "vorläufige Veranlagung":
      color = "#ff0000";
      break;
    default:
      color = "#ff0000";
  }
  return color;
};

export const getColorFromFrontKey = (key) => {
  if (key) {
    switch (key) {
      case "C1":
      case "C2":
        return "#4ecdc4";
      default:
        return "#F38630"; //orange
    }
  } else {
    return "#0D6759"; //green
  }
};

export const getColorForFront = (frontDesc) => {
  let colorHash = new ColorHash({ saturation: 0.3 });
  return colorHash.hex("" + frontDesc + "1234567890");
};

export const getColorForKassenzeichenGeometry = (geo_field) => {
  let colorHash = new ColorHash({ saturation: 0.4 });
  return colorHash.hex("" + geo_field);
};

export const createFlaechenStyler = (changeRequestsEditMode, kassenzeichen) => {
  return (feature) => {
    if (feature.properties.type === "annotation") {
      // const currentColor = '#ffff00';

      let opacity,
        lineColor,
        fillColor = "#B90504",
        markerColor,
        weight = 2,
        fillOpacity;

      if (feature.selected === true) {
        opacity = 0.9;
        lineColor = "#0C7D9D";
        fillOpacity = 0.8;
        markerColor = "blue";
      } else {
        opacity = 1;
        fillOpacity = 0.6;
        lineColor = "#990100";
        markerColor = "red";
      }

      return {
        color: lineColor,
        radius: 8,
        weight,
        opacity,
        fillColor,
        fillOpacity,
        className: "annotation-" + feature.id,
        defaultMarker: true,

        customMarker: L.ExtraMarkers.icon({
          icon: feature.inEditMode === true ? "fa-square" : undefined,
          markerColor,
          shape: "circle",
          prefix: "fa",
          number: "X",
        }),
      };
    } else {
      let color;
      if (changeRequestsEditMode === false) {
        color = getColorFromFlaechenArt(feature.properties.art_abk);
      } else {
        let cr = getCRsForFeature(kassenzeichen, feature.properties);
        let mergedFlaeche = getMergedFlaeche(feature.properties, cr);
        color = getColorFromFlaechenArt(mergedFlaeche.art_abk);
      }
      let opacity = 0.6;
      let linecolor = "#000000";
      let weight = 1;

      if (feature.selected === true) {
        opacity = 0.9;
        linecolor = "#0C7D9D";
        weight = "2";
      }
      const style = {
        color: linecolor,
        weight: weight,
        opacity: 1.0,
        fillColor: color,
        fillOpacity: opacity,
        className: "verdis-flaeche-" + feature.properties.bez,
      };
      return style;
    }
  };
};

export const kassenzeichenGeometrienStyle = (feature) => {
  let color = getColorForKassenzeichenGeometry(feature.properties.geomstring);
  let opacity = 0.6;
  let linecolor = "#000000";
  let weight = 1;

  if (feature.selected === true) {
    opacity = 0.9;
    linecolor = "#0C7D9D";
    weight = "2";
  }

  const style = {
    color: linecolor,
    weight: weight,
    opacity: 1.0,
    fillColor: color,
    fillOpacity: opacity,
  };

  return style;
};

export const frontenStyle = (feature) => {
  let linecolor = getColorFromFrontKey(feature.properties.key);
  let opacity = 0.6;
  let weight = 10;

  if (feature.selected === true) {
    opacity = 0.9;
    linecolor = "#0C7D9D";
    weight = "10";
  }

  const style = {
    color: linecolor,
    weight: weight,
    opacity: opacity,
  };

  return style;
};

export const flaechenLabeler = (feature) => {
  return (
    <h5 style={getStyleFromFeatureConsideringSelection(feature)}>
      {feature.properties.bez}
    </h5>
  );
};

const getStyleFromFeatureConsideringSelection = (feature) => {
  let base = {
    color: "blue",
    //   "textShadow": "1px 1px 0px  #000000,-1px 1px 0px  #000000, 1px -1px 0px  #000000, -1px -1px 0px  #000000, 2px 2px 15px #000000",
  };
  if (feature.selected) {
    const radius = 10;
    const borderDef = `${radius}px ${radius}px ${radius}px ${radius}px`;
    return {
      ...base,
      background: "rgba(67, 149, 254, 0.8)",
      WebkitBorderRadius: borderDef,
      MozBorderRadius: borderDef,
      borderRadius: borderDef,
      padding: "5px",
      defaultMarker: true,
    };
  } else {
    return base;
  }
};

export const getMarkerStyleFromFeatureConsideringSelection = (feature) => {
  let opacity = 0.6;
  let linecolor = "#000000";
  let weight = 1;

  if (feature.selected === true) {
    opacity = 0.9;
    linecolor = "#0C7D9D";
    weight = "2";
  }
  let text, yTextPos;
  if (feature.properties.type === "annotation") {
    text = feature.properties.name;
  } else {
    text = feature.properties.bez;
  }
  // if (feature.properties.type === 'annotation') {
  // 	if (feature.geometry.type === 'Point') {
  // 		yTextPos = 20;
  // 	} else {
  // 		yTextPos = 10;
  // 	}
  // } else {
  // 	yTextPos = 10;
  // }
  yTextPos = 15;
  if (feature.properties.type === "annotation") {
    if (feature.geometry.type === "Point") {
      yTextPos = 20;
    }
  }

  const style = {
    radius: 10,
    color: linecolor,
    weight: weight,
    opacity: 1.0,
    fillOpacity: opacity,
    svgSize: 30,
    className: "verdis-flaeche-marker-" + feature.properties.bez,
    svg: `<svg interactive="false" height="30" width="30" skipstyle="background-color:green;" >
      <style>
          .flaeche { font: bold 16px sans-serif; }
      </style>

      <text x="15" y="${yTextPos}" vertical-align="middle" class="flaeche" text-anchor="middle" alignment-baseline="central" fill="#0B486B">${text}</text>
    </svg>`,
  };

  return style;
};
