import { gql } from "graphql-request";

export const REST_SERVICE = "https://verdis-cloud.cismet.de/verdis/api/";
export const DOMAIN = "VERDIS_GRUNDIS";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";

export const query = gql`
  query Kassenzeichen($kassenzeichen: Int) {
    kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
      datum_erfassung
      bemerkung
      sperre
      kassenzeichennummer8
      frontenArray(
        order_by: {
          frontObject: {
            frontinfoObject: {
              lage_sr_satzung: { strassenreinigung: { key: asc } }
            }
          }
        }
      ) {
        frontObject {
          frontinfoObject {
            laenge_grafik
            strasseObject {
              name
              schluessel
            }
            lage_sr_satzung {
              strassenreinigung {
                key
                schluessel
              }
            }
          }
        }
      }
      flaechenArray(
        order_by: {
          flaecheObject: {
            flaecheninfoObject: { flaechenbeschreibung: { beschreibung: asc } }
          }
        }
      ) {
        flaecheObject {
          datum_erfassung
          flaechenbezeichnung
          flaecheninfoObject {
            groesse_aus_grafik
            flaechenartObject {
              art_abkuerzung
            }
            anschlussgradObject {
              grad_abkuerzung
            }
            flaechenbeschreibung {
              beschreibung
            }
          }
          id
        }
      }
      kanalanschlussObject {
        rkangeschlossen
        rkvorhanden
        mkrangeschlossen
        mkrvorhanden
        mksangeschlossen
        mksvorhanden
        skvorhanden
        skangeschlossen
        sgvorhanden
        sgentleerung
        evg
        kkaentleerung
        kkavorhanden
      }
    }
    aenderungsanfrage(
      where: { kassenzeichen_nummer: { _eq: $kassenzeichen } }
    ) {
      aenderungsanfrage_status {
        name
      }
    }
  }
`;
