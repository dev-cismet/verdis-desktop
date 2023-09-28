import { gql } from "graphql-request";

import queries from "./queries";
export const REST_SERVICE = "https://verdis-cloud.cismet.de/verdis/api/";
export const DOMAIN = "VERDIS_GRUNDIS";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";
export const APP_KEY = "verdis-desktop";
export const STORAGE_PREFIX = "1";
export const query = gql`
  ${queries.kassenzeichenD}
`;
export const pointquery = gql`
  ${queries.kassenzeichenForPoint}
`;

export const geoFieldsQuery = gql`
  ${queries.geoFields}
`;
