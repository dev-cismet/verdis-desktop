const queries = {};
export const geomFactories = {};
export default queries;

queries.kassenzeichenD = `
query Kassenzeichen($kassenzeichen: Int) {
  kassenzeichen(where: { kassenzeichennummer8: { _eq: $kassenzeichen } }) {
    id
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
        nummer
        id
        bearbeitet_durch
        erfassungsdatum
        frontinfoObject {
          anteil
          baulasten
          grunddienstbarkeit
          id
          geom {
            geo_field
          }
          laenge_grafik
          laenge_korrektur
          lage_sr_satzung {
            id
            sr_bem
            sr_klasse
            strasse
            strasseObject {
              id
              name
              schluessel
            }
            strassenreinigung {
              id
              key
              name
              schluessel
            }
            wd_bem
            winterdienst {
              id
              key
              name
              schluessel
            }
            wd_prio
          }
          lage_wd_satzung {
            id
            sr_klasse
            strasse
            strasseObject {
              id
              name
              schluessel
            }
            strassenreinigung {
              id
              key
              name
              schluessel
            }
            wd_bem
            winterdienst {
              key
              id
              name
              schluessel
            }
          }
          quadratwurzel
          sr_bem
          sr_klasse_or
          sr_veranlagung
          strasseObject {
            id
            name
            schluessel
          }
          wd_bem
          strassenreinigung {
            id
            key
            name
            schluessel
          }
          wd_prio_or
          wd_veranlagung
          winkel
          winterdienst {
            id
            key
            name
            schluessel
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
        anteil
        bemerkung
        datum_erfassung
        datum_veranlagung
        flaechenbezeichnung
        id
        flaecheninfoObject {
          anschlussgradObject {
            grad
            grad_abkuerzung
            id
          }
          flaechenartObject {
            art
            art_abkuerzung
            id
          }
          groesse_aus_grafik
          groesse_korrektur
          id
          nachgewiesen
          flaechenbeschreibung {
            dachflaeche
            id
            beschreibung
          }
          beschreibung
          geom {
            geo_field
          }
        }
        flaecheninfo
      }
    }
    kassenzeichen_geometrienArray {
      id
      kassenzeichen_geometrieObject {
        id
        istfrei
        name
        geom {
          geo_field
          
        }
      }
    }
    kanalanschlussObject {
      rkangeschlossen
      mkrangeschlossen
      mksangeschlossen
      skangeschlossen
      rkvorhanden
      mkrvorhanden
      mksvorhanden
      skvorhanden
      sgvorhanden
      sgentleerung
      kkaentleerung
      kkavorhanden
      evg
      befreiungenunderlaubnisseArray {
        id
        befreiungerlaubnisObject {
          aktenzeichen
          antrag_vom
          gueltig_bis
          befreiungerlaubnis_nutzung {
            name
          }
          befreiungerlaubnis_geometrieArrayRelationShip {
            id
            befreiungerlaubnis_geometrie_typ_versickerung {
              name
            }
            befreiungerlaubnis_geometrie_typ_einleitung {
              name
            }
            bemerkung
            gewaessername           
            gutachten_vorhanden
            durchfluss
            geom {
              geo_field
            }
          }
        }
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
`;
