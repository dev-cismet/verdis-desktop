import { createSlice } from "@reduxjs/toolkit";
import {
  ENDPOINT,
  WUNDA_ENDPOINT,
  buchungsblattQuery,
  flurStueckQuery,
  geoFieldsQuery,
  pointquery,
  query,
} from "../../constants/verdis";
import {
  setBefreiungErlaubnisCollection,
  setFeatureCollection,
  setFlaechenCollection,
  setFrontenCollection,
  setGeneralGeometryCollection,
} from "./mapping";
import {
  getFlaechenFeatureCollection,
  getFrontenFeatureCollection,
  getGeneralGeomfeatureCollection,
  getVersickerungsGenFeatureCollection,
} from "../../tools/featureFactories";
import { createFeatureArray } from "../../tools/mappingTools";

const initialState = {
  kassenzeichen: {},
  aenderungsAnfrage: {},
  flaechenId: null,
  frontenId: null,
  seepageId: null,
  front: {},
  flaeche: {},
  seepage: {},
  previousSearches: [],
  landparcels: [],
  gemarkungen: [],
  isLoading: false,
  isLoadingGeofields: false,
  virtualCity: "",
  febBlob: null,
  errorMessage: null,
  buchungsblatt: null,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeKassenzeichen(state, action) {
      state.kassenzeichen = action.payload;
      return state;
    },
    storeAenderungsAnfrage(state, action) {
      state.aenderungsAnfrage = action.payload;
      return state;
    },
    storeFlaechenId(state, action) {
      state.flaechenId = action.payload;
      return state;
    },
    storeFrontenId(state, action) {
      state.frontenId = action.payload;
      return state;
    },
    storeSeepageId(state, action) {
      state.seepageId = action.payload;
      return state;
    },
    storeFront(state, action) {
      state.front = action.payload;
      return state;
    },
    storeFlaeche(state, action) {
      state.flaeche = action.payload;
      return state;
    },
    storeSeepage(state, action) {
      state.seepage = action.payload;
      return state;
    },
    storeFebBlob(state, action) {
      state.febBlob = action.payload;
      return state;
    },
    storeLandparcels(state, action) {
      state.landparcels = action.payload;
      return state;
    },
    storeGemarkungen(state, action) {
      state.gemarkungen = action.payload;
      return state;
    },
    storeVirtualCity(state, action) {
      state.virtualCity = action.payload;
      return state;
    },
    storeBuchungsblatt(state, action) {
      state.buchungsblatt = action.payload;
      return state;
    },
    resetStates(state) {
      state.front = {};
      state.frontenId = null;
      state.flaeche = {};
      state.flaechenId = null;
      state.seepage = {};
      state.seepageId = null;
      state.errorMessage = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
      return state;
    },
    setIsLoadingGeofields(state, action) {
      state.isLoadingGeofields = action.payload;
      return state;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
      return state;
    },
    addSearch(state, action) {
      if (state.previousSearches.length >= 8) {
        const updatedSearches = state.previousSearches.slice(
          0,
          state.previousSearches.length - 1
        );
        state.previousSearches = [
          ...new Set([action.payload, ...updatedSearches]),
        ];
      } else {
        state.previousSearches = [
          ...new Set([action.payload, ...state.previousSearches]),
        ];
      }
      return state;
    },
  },
});

export default slice;

export const searchForGeoFields = (bbPoly) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    dispatch(setIsLoadingGeofields(true));
    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: geoFieldsQuery,
        variables: { bbPoly },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(setIsLoadingGeofields(false));
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(setIsLoadingGeofields(false));
        dispatch(setFeatureCollection(createFeatureArray(result.data)));
      })
      .catch((error) => {
        dispatch(setIsLoadingGeofields(false));
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const getVirtualCityPassword = () => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    fetch(
      "https://wunda-cloud.cismet.de/wunda/api/configattributes/virtualcitymap_secret",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(storeVirtualCity(result.virtualcitymap_secret));
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const getflurstuecke = () => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    fetch(WUNDA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: flurStueckQuery,
        variables: null,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(storeLandparcels(result.data.view_alkis_landparcell));
        dispatch(storeGemarkungen(result.data.gemarkung));
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const getBuchungsblatt = (buchblattnummer) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    fetch(WUNDA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: buchungsblattQuery,
        variables: { grundbuchblattnummer: buchblattnummer },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(storeBuchungsblatt(result.data.view_alkis_buchungsblatt[0]));
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const searchForKassenzeichenWithPoint = (
  x,
  y,
  urlParams,
  setUrlParams
) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: pointquery,
        variables: { x, y },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(
          searchForKassenzeichen(
            result.data.kassenzeichen[0].kassenzeichennummer8 + "",
            urlParams,
            setUrlParams
          )
        );
        console.log("result", result);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const getFEBByStac = (
  hints,
  format,
  scale,
  orientation,
  drainEffectiveness
) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    const kassenzeichen = getState().search.kassenzeichen.kassenzeichennummer8;

    const form = new FormData();
    let taskParameters = {
      parameters: {
        BODY: "STRING_AS_BYTE_ARRAY",
        TYPE: "FLAECHEN",
        MAP_FORMAT:
          format === "optimal"
            ? "A4"
            : format + orientation === "optimal"
            ? ""
            : orientation,
        HINTS: hints || "",
        MAP_SCALE: scale === "optimal" ? "1000" : scale || "1000",
        ABLUSSWIRKSAMKEIT: drainEffectiveness ? "TRUE" : "FALSE",
      },
    };
    form.append(
      "taskparams",
      new Blob([JSON.stringify(taskParameters)], { type: "application/json" })
    );
    form.append("file", `${kassenzeichen}`);

    dispatch(setIsLoading(true));

    fetch(
      "https://verdis-cloud.cismet.de/verdis/api/actions/VERDIS_GRUNDIS.EBReport/tasks?resultingInstanceType=result",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: form,
      }
    )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          dispatch(setIsLoading(false));
          console.log(
            "Error:" + response.status + " -> " + response.statusText
          );
        }
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
        console.log(e);
      })
      .then((result) => {
        if (result && !result.error && result.res !== '{"nothing":"at all"}') {
          let byteCharacters = atob(result.res);
          let byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          let byteArray = new Uint8Array(byteNumbers);

          var blob = new Blob([byteArray], { type: "application/pdf" });
          dispatch(storeFebBlob(blob));
          dispatch(setIsLoading(false));
        } else {
          console.log(result);
          dispatch(setIsLoading(false));
        }
      });
  };
};

export const searchForKassenzeichen = (
  kassenzeichen,
  urlParams,
  setUrlParams
) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    const syncKassenzeichen = getState().settings.syncKassenzeichen;
    if (!kassenzeichen || isNaN(+kassenzeichen)) {
      console.error("Invalid kassenzeichen");
      dispatch(setErrorMessage("Invalid kassenzeichen"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setIsLoading(true));

    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: query,
        variables: { kassenzeichen: kassenzeichen },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(setIsLoading(false));
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        const data = result?.data;
        if (data?.kassenzeichen?.length > 0) {
          const trimmedQuery = kassenzeichen.trim();

          dispatch(storeKassenzeichen(data.kassenzeichen[0]));
          dispatch(storeAenderungsAnfrage(data.aenderungsanfrage));
          if (urlParams && setUrlParams) {
            if (urlParams.get("kassenzeichen") !== trimmedQuery) {
              setUrlParams({ kassenzeichen: trimmedQuery });
            }
          }
          dispatch(addSearch(trimmedQuery));
          dispatch(resetStates());

          if (syncKassenzeichen) {
            fetch(
              "http://localhost:18000/gotoKassenzeichen?kassenzeichen=" +
                trimmedQuery
            ).catch((error) => {
              //  i expect an error here
            });
          }

          //create the featureCollections

          dispatch(
            setFlaechenCollection(
              getFlaechenFeatureCollection(data.kassenzeichen[0])
            )
          );
          dispatch(
            setFrontenCollection(
              getFrontenFeatureCollection(data.kassenzeichen[0])
            )
          );

          dispatch(
            setGeneralGeometryCollection(
              getGeneralGeomfeatureCollection(data.kassenzeichen[0])
            )
          );

          dispatch(
            setBefreiungErlaubnisCollection(
              getVersickerungsGenFeatureCollection(data.kassenzeichen[0])
            )
          );
          dispatch(setIsLoading(false));
        } else {
          dispatch(setErrorMessage("Kassenzeichen not found"));
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
        dispatch(setIsLoading(false));
      });
  };
};

export const {
  storeKassenzeichen,
  storeAenderungsAnfrage,
  storeFlaechenId,
  storeFrontenId,
  storeSeepageId,
  storeFront,
  storeFlaeche,
  storeSeepage,
  storeLandparcels,
  storeGemarkungen,
  resetStates,
  storeVirtualCity,
  storeBuchungsblatt,
  setIsLoading,
  setIsLoadingGeofields,
  setErrorMessage,
  addSearch,
  storeFebBlob,
} = slice.actions;

slice.actions.searchForKassenzeichen = searchForKassenzeichen;

export const getKassenzeichen = (state) => {
  return state.search.kassenzeichen;
};

export const getAenderungsAnfrage = (state) => {
  return state.search.aenderungsAnfrage;
};

export const getFlaechenId = (state) => {
  return state.search.flaechenId;
};

export const getFrontenId = (state) => {
  return state.search.frontenId;
};

export const getSeepageId = (state) => {
  return state.search.seepageId;
};

export const getFront = (state) => {
  return state.search.front;
};

export const getFlaeche = (state) => {
  return state.search.flaeche;
};

export const getSeepage = (state) => {
  return state.search.seepage;
};

export const getPreviousSearches = (state) => {
  return state.search.previousSearches;
};

export const getLandparcels = (state) => {
  return state.search.landparcels;
};

export const getGemarkungen = (state) => {
  return state.search.gemarkungen;
};

export const getIsLoading = (state) => {
  return state.search.isLoading;
};

export const getIsLoadingGeofields = (state) => {
  return state.search.isLoadingGeofields;
};

export const getErrorMessage = (state) => {
  return state.search.errorMessage;
};

export const getFebBlob = (state) => {
  return state.search.febBlob;
};

export const getVirtualCity = (state) => {
  return state.search.virtualCity;
};

export const getBuchungsblattnummer = (state) => {
  return state.search.buchungsblatt;
};
