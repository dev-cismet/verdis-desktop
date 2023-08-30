import { gql } from "graphql-request";

import queries from "./queries";
export const REST_SERVICE = "https://verdis-cloud.cismet.de/verdis/api/";
export const DOMAIN = "VERDIS_GRUNDIS";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";
export const APP_KEY = "verdis-desktop";
export const STORAGE_PREFIX = "1";
export const query = gql`
<<<<<<< HEAD
  ${queries.kassenzeichenT}
=======
  query Kassenzeichen($kassenzeichen: Int) {
    kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
      datum_erfassung
      bemerkung
      sperre
      kassenzeichennummer8
      grunddienstbarkeit
      baulasten
      quadratwurzel
      keine_gesicherte_erschliessung
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
          anteil
          bemerkung
          datum_erfassung
          datum_veranlagung
          flaecheninfoObject {
            groesse_aus_grafik
            groesse_korrektur
            flaechenart
            anschlussgrad
            beschreibung
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
      frontenArray(order_by: { frontObject: { nummer: asc } }) {
        frontObject {
          nummer
          frontinfoObject {
            laenge_grafik
            laenge_korrektur
            strasseObject {
              name
              schluessel
            }
            sr_veranlagung
            lage_sr_satzung {
              sr_bem
              strassenreinigung {
                key
                schluessel
              }
            }
            winkel
            anteil
            garage_stellplatz
          }
          bearbeitet_durch
          erfassungsdatum
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
        befreiungenunderlaubnisseArray {
          befreiungerlaubnisObject {
            aktenzeichen
            antrag_vom
            gueltig_bis
            befreiungerlaubnis_nutzung {
              name
            }
            befreiungerlaubnis_geometrieArrayRelationShip {
              durchfluss
              gutachten_vorhanden
              befreiungerlaubnis_geometrie_typ_versickerung {
                name
              }
            }
          }
        }
        befreiungenunderlaubnisse
      }
      kassenzeichen_geometrienArray {
        kassenzeichen_geometrieObject {
          name
        }
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
>>>>>>> 4036908 (issue #002 move master detail flaechen to redux)
`;
