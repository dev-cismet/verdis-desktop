import { createSlice } from "@reduxjs/toolkit";
import { ENDPOINT, pointquery, query } from "../../constants/verdis";
import {
  setBefreiungErlaubnisCollection,
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
  isLoading: false,
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
    resetStates(state) {
      state.front = {};
      state.frontenId = null;
      state.flaeche = {};
      state.flaechenId = null;
      state.seepage = {};
      state.seepageId = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
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

export const searchForKassenzeichen = (
  kassenzeichen,
  urlParams,
  setUrlParams
) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    const syncKassenzeichen = getState().settings.syncKassenzeichen;
    // useQuery({
    //   queryFn: async () =>
    //     request(
    //       ENDPOINT,
    //       query,
    //       { kassenzeichen: kassenzeichen },
    //       {
    //         Authorization: `Bearer ${jwt}`,
    //       }
    //     ),
    //   queryKey: ["kassenzeichen", kassenzeichen],
    //   enabled: !!kassenzeichen && !isNaN(+kassenzeichen),
    //   refetchOnWindowFocus: false,
    //   retry: false,
    //   onSuccess: (data) => {
    //     console.log("data", data);
    //   },
    // });
    if (!kassenzeichen || isNaN(+kassenzeichen)) {
      console.error("Invalid kassenzeichen");
      return;
    }

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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        const data = result?.data;
        console.log("xxx data", data);
        if (data?.kassenzeichen?.length > 0) {
          console.log(kassenzeichen);
          const trimmedQuery = kassenzeichen.trim();
          dispatch(storeKassenzeichen(data.kassenzeichen[0]));
          dispatch(storeAenderungsAnfrage(data.aenderungsanfrage));
          if (urlParams.get("kassenzeichen") !== trimmedQuery) {
            setUrlParams({ kassenzeichen: trimmedQuery });
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
        }
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
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
  resetStates,
  setIsLoading,
  addSearch,
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

export const getIsLoading = (state) => {
  return state.search.isLoading;
};
