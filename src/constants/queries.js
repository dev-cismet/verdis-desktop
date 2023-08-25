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

queries.kassenzeichenT = `
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

queries.kassenzeichen = `query q($kassenzeichen: Int) {
    kassenzeichen(where: {kassenzeichennummer8: {_eq: $kassenzeichen}}) {
      bemerkung
      bemerkung_sperre
      bemerkung_zu_abgaben
      datum_erfassung
      datum_veranlagung
      grundsteuer
      id
      kassenzeichennummer8
      letzte_aenderung_ts
      letzte_aenderung_von
      sperre
      veranlagungszettel
      abfallgebuehrObject {
        id
        name
        schluessel
      }
      dms_urlsArray {
        id
        kassenzeichen_reference
        dms_urlObject {
          description
          id
          name
          typ
          url {
            id
            object_name
            url_base {
              id
              path
              prot_prefix
              server
            }
            url_base_id
          }
        }
      }
      flaechenArray {
        id
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
          }
          flaecheninfo
        }
      }
      frontenArray {
        id
        frontObject {
          bearbeitet_durch
          erfassungsdatum
          frontinfoObject {
            anteil
            baulasten
            grunddienstbarkeit
            id
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
          nummer
          id
        }
      }
      kanalanschlussObject {
        befreiungenunderlaubnisseArray {
          id
          kanalanschluss_reference
          befreiungerlaubnisObject {
            aktenzeichen
            antrag_vom
            befreiungerlaubnis_geometrieArrayRelationShip {
              befreiungerlaubnisObject {
                aktenzeichen
                antrag_vom
                gueltig_bis
                id
                nutzung
                befreiungerlaubnis_geometrieArrayRelationShip {
                  befreiungerlaubnis
                  bemerkung
                  durchfluss
                  filterkonstante
                  gewaessername
                  gutachten_vorhanden
                  id
                  typ_einleitung
                  typ_versickerung
                }
                befreiungerlaubnis_nutzung {
                  id
                  key
                  name
                }
              }
              bemerkung
              durchfluss
              filterkonstante
              gewaessername
              gutachten_vorhanden
              id
              typ_einleitung
              typ_versickerung
              befreiungerlaubnis_geometrie_typ_versickerung {
                id
                key
                name
              }
              befreiungerlaubnis_geometrie_typ_einleitung {
                id
                key
                name
              }
            }
            gueltig_bis
            id
            nutzung
          }
        }
        evg
        id
        kkaentleerung
        kkavorhanden
        mkrangeschlossen
        mkrvorhanden
        mksangeschlossen
        mksvorhanden
        rkangeschlossen
        rkvorhanden
        sgentleerung
        sgvorhanden
        skangeschlossen
        skvorhanden
      }
      kassenzeichen_geometrienArray {
        id
        kassenzeichen_geometrieObject {
          id
          istfrei
          name
        }
      }
      schmutzwasserObject {
        id
        name
        schluessel
      }
    }
  }`;

queries.keys = `query keys {
    abfallgebuehr {
      id
      name
      schluessel
    }
    anschlussgrad {
      grad
      grad_abkuerzung
      id
    }
    anschlussstatus {
      id
      name
    }
    strassenreinigung {
      id
      key
      name
      schluessel
    }
    winterdienst {
      key
      name
      schluessel
      id
    }
  }
  `;

queries.kassenzeichenHC = `query q {
    kassenzeichen(where: {kassenzeichennummer8: {_eq: 60432515}}) {
      bemerkung
      bemerkung_sperre
      bemerkung_zu_abgaben
      datum_erfassung
      datum_veranlagung
      grundsteuer
      id
      kassenzeichennummer8
      letzte_aenderung_ts
      letzte_aenderung_von
      sperre
      veranlagungszettel
      abfallgebuehrObject {
        id
        name
        schluessel
      }
      dms_urlsArray {
        id
        kassenzeichen_reference
        dms_urlObject {
          description
          id
          name
          typ
          url {
            id
            object_name
            url_base {
              id
              path
              prot_prefix
              server
            }
            url_base_id
          }
        }
      }
      flaechenArray {
        id
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
          }
          flaecheninfo
        }
      }
      frontenArray {
        id
        frontObject {
          bearbeitet_durch
          erfassungsdatum
          frontinfoObject {
            anteil
            baulasten
            grunddienstbarkeit
            id
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
          nummer
          id
        }
      }
      kanalanschlussObject {
        befreiungenunderlaubnisseArray {
          id
          kanalanschluss_reference
          befreiungerlaubnisObject {
            aktenzeichen
            antrag_vom
            befreiungerlaubnis_geometrieArrayRelationShip {
              befreiungerlaubnisObject {
                aktenzeichen
                antrag_vom
                gueltig_bis
                id
                nutzung
                befreiungerlaubnis_geometrieArrayRelationShip {
                  befreiungerlaubnis
                  bemerkung
                  durchfluss
                  filterkonstante
                  gewaessername
                  gutachten_vorhanden
                  id
                  typ_einleitung
                  typ_versickerung
                }
                befreiungerlaubnis_nutzung {
                  id
                  key
                  name
                }
              }
              bemerkung
              durchfluss
              filterkonstante
              gewaessername
              gutachten_vorhanden
              id
              typ_einleitung
              typ_versickerung
              befreiungerlaubnis_geometrie_typ_versickerung {
                id
                key
                name
              }
              befreiungerlaubnis_geometrie_typ_einleitung {
                id
                key
                name
              }
            }
            gueltig_bis
            id
            nutzung
          }
        }
        evg
        id
        kkaentleerung
        kkavorhanden
        mkrangeschlossen
        mkrvorhanden
        mksangeschlossen
        mksvorhanden
        rkangeschlossen
        rkvorhanden
        sgentleerung
        sgvorhanden
        skangeschlossen
        skvorhanden
      }
      kassenzeichen_geometrienArray {
        id
        kassenzeichen_geometrieObject {
          id
          istfrei
          name
        }
      }
      schmutzwasserObject {
        id
        name
        schluessel
      }
    }
  }`;

const gqlQuery = `query  ${queries.kassenzeichen}`;
