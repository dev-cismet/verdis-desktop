import dayjs from "dayjs";

export const generalExtractor = (kassenzeichen, aenderungsAnfrage) => {
  const dateFormat = "DD.MM.YYYY";
  const bemerkungsObject = kassenzeichen?.bemerkung;
  let formattedBemerkungen;
  if (bemerkungsObject) {
    const bemerkungen = JSON.parse(bemerkungsObject).bemerkungen.map(
      (bemerkung) => bemerkung.bemerkung
    );
    formattedBemerkungen = bemerkungen.join("\n");
  }
  return {
    date: kassenzeichen?.datum_erfassung
      ? dayjs(
          dayjs(kassenzeichen?.datum_erfassung).format(dateFormat),
          dateFormat
        )
      : null,
    bemerkung: formattedBemerkungen,
    sperre: kassenzeichen?.sperre,
    aenderungsAnfrage:
      aenderungsAnfrage && aenderungsAnfrage[0]?.aenderungsanfrage_status?.name,
    kassenzeichenNummer: kassenzeichen?.kassenzeichennummer8,
  };
};

export const statisticsExtractor = (kassenzeichen, aenderungsAnfrage) => {
  return [
    {
      value: kassenzeichen?.flaechenArray?.length,
      title: "Flächen",
    },
    {
      value: kassenzeichen?.frontenArray?.length,
      title: "Fronten",
    },
    {
      value:
        kassenzeichen?.kanalanschlussObject?.befreiungenunderlaubnisseArray
          ?.length,
      title: "Versickerungsgenehmigungen",
    },
    {
      value: kassenzeichen?.kassenzeichen_geometrienArray?.length,
      title: "Geometrien",
    },
    {
      value: aenderungsAnfrage?.length,
      title: "Änderungsanfragen",
    },
  ];
};

export const sumsExtractor = (kassenzeichen) => {
  const data = kassenzeichen?.flaechenArray?.map((flaeche) => ({
    size: flaeche?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: flaeche?.flaecheObject?.flaecheninfoObject?.flaechenartObject
      ?.art_abkuerzung,
    connection:
      flaeche?.flaecheObject?.flaecheninfoObject?.anschlussgradObject
        ?.grad_abkuerzung,
  }));

  const typeSizeMap = new Map();
  const connectionSizeMap = new Map();

  data?.forEach((obj) => {
    const { type, connection, size } = obj;

    if (!typeSizeMap.has(type)) {
      typeSizeMap.set(type, 0);
    }
    typeSizeMap.set(type, typeSizeMap.get(type) + size);

    if (!connectionSizeMap.has(connection)) {
      connectionSizeMap.set(connection, 0);
    }
    connectionSizeMap.set(connection, connectionSizeMap.get(connection) + size);
  });

  const types = Array.from(typeSizeMap, ([type, size]) => ({ type, size }));
  const connections = Array.from(connectionSizeMap, ([type, size]) => ({
    type,
    size,
  }));

  return [
    {
      title: "Bewertung",
      items: types,
    },
    {
      title: "Anschlussgrad",
      items: connections,
    },
  ];
};

export const summaryExtractor = (kassenzeichen) => {
  const data = kassenzeichen?.frontenArray?.map((front) => ({
    key:
      front?.frontObject?.frontinfoObject?.lage_sr_satzung?.strassenreinigung
        ?.key +
      "-" +
      front?.frontObject?.frontinfoObject?.lage_sr_satzung?.strassenreinigung
        ?.schluessel,
    streetNumber:
      front?.frontObject?.frontinfoObject?.strasseObject?.schluessel,
    streetName: front?.frontObject?.frontinfoObject?.strasseObject?.name,
    length: front?.frontObject?.frontinfoObject?.laenge_grafik,
  }));

  const streetMap = data?.reduce((map, obj) => {
    const { key, streetNumber, streetName, length } = obj;
    const uniqueKey = `${key}-${streetNumber}-${streetName}`;

    if (!map[uniqueKey]) {
      map[uniqueKey] = { ...obj };
    } else {
      map[uniqueKey].length = (
        Number(map[uniqueKey].length) + Number(length)
      ).toString();
    }

    return map;
  }, {});

  const resultArray = Object.values(streetMap || []);

  return resultArray;
};

export const areasExtractor = (kassenzeichen) => {
  const data = kassenzeichen?.flaechenArray?.map((row) => ({
    name: row?.flaecheObject?.flaechenbezeichnung,
    size: row?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: row?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
      ?.beschreibung,
  }));
  return data;
};

export const areasDetailsExtractor = (kassenzeichen) => {
  const data = kassenzeichen?.flaechenArray?.map((flaeche) => ({
    name: flaeche?.flaecheObject?.flaechenbezeichnung,
    size: flaeche?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: flaeche?.flaecheObject?.flaecheninfoObject?.flaechenartObject
      ?.art_abkuerzung,
    connection:
      flaeche?.flaecheObject?.flaecheninfoObject?.anschlussgradObject
        ?.grad_abkuerzung,
    description:
      flaeche?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
        ?.beschreibung,
    date: flaeche?.flaecheObject?.datum_erfassung,
    id: flaeche?.flaecheObject?.id,
  }));

  return data;
};

export const sewerConnectionExtractor = (kassenzeichen) => {
  const sewegeConnection = kassenzeichen?.kanalanschlussObject;

  return {
    rk: {
      vorhanden: sewegeConnection?.rkvorhanden,
      angeschlossen: sewegeConnection?.rkangeschlossen,
    },
    mkr: {
      vorhanden: sewegeConnection?.mkrvorhanden,
      angeschlossen: sewegeConnection?.mkrangeschlossen,
    },
    mks: {
      vorhanden: sewegeConnection?.mksvorhanden,
      angeschlossen: sewegeConnection?.mksangeschlossen,
    },
    sk: {
      vorhanden: sewegeConnection?.skvorhanden,
      angeschlossen: sewegeConnection?.skangeschlossen,
    },
    sg: {
      vorhanden: sewegeConnection?.sgvorhanden,
      entleerung: sewegeConnection?.sgentleerung,
    },
    kka: {
      vorhanden: sewegeConnection?.kkavorhanden,
      entleerung: sewegeConnection?.kkaentleerung,
    },
    evg: {
      vorhanden: sewegeConnection?.evg,
    },
  };
};

export const fileNumberExtractor = (kassenzeichen) => {
  const data =
    kassenzeichen?.kanalanschlussObject?.befreiungenunderlaubnisseArray?.map(
      (befreiungErlaubnis) => ({
        title:
          befreiungErlaubnis?.befreiungerlaubnisObject?.aktenzeichen +
          " (" +
          befreiungErlaubnis?.befreiungerlaubnisObject
            ?.befreiungerlaubnis_nutzung?.name +
          ")",
        data: befreiungErlaubnis?.befreiungerlaubnisObject?.befreiungerlaubnis_geometrieArrayRelationShip?.map(
          (relationship) => ({
            title:
              relationship?.befreiungerlaubnis_geometrie_typ_versickerung?.name,
            value: relationship?.durchfluss + " l/s",
          })
        ),
      })
    );

  return data;
};

export const exemptionExtractor = (kassenzeichen) => {
  const data =
    kassenzeichen?.kanalanschlussObject?.befreiungenunderlaubnisseArray?.map(
      (befreiungErlaubnis, i) => ({
        key: i,
        name:
          befreiungErlaubnis?.befreiungerlaubnisObject?.aktenzeichen +
          " (" +
          befreiungErlaubnis?.befreiungerlaubnisObject
            ?.befreiungerlaubnis_nutzung?.name +
          ")",
        seepageFrom: befreiungErlaubnis?.befreiungerlaubnisObject?.antrag_vom,
        seepageUntil: befreiungErlaubnis?.befreiungerlaubnisObject?.gueltig_bis,
        useCase: "Muss noch hinzugefügt werden",
        type: befreiungErlaubnis?.befreiungerlaubnisObject
          ?.befreiungerlaubnis_geometrieArrayRelationShip
          ?.befreiungerlaubnis_geometrie_typ_versickerung?.name,
        seepage:
          befreiungErlaubnis?.befreiungerlaubnisObject
            ?.befreiungerlaubnis_geometrieArrayRelationShip?.durchfluss,
        gVerth:
          befreiungErlaubnis?.befreiungerlaubnisObject
            ?.befreiungerlaubnis_geometrieArrayRelationShip
            ?.gutachten_vorhanden,
      })
    );

  return [data];
};

export const seepageDetailsExtractor = (input) => {
  return [
    {
      title: "Aktenzeichen",
    },
    {
      title: "Antrag vom",
    },
    {
      title: "Gültig bis",
    },
    {
      title: "Nutzung",
      select: true,
    },
    {
      title: "Typ",
      select: true,
      seperator: true,
    },
    {
      title: "Q[l/s]",
      select: true,
    },
    {
      title: "G-Verh",
      checkbox: true,
    },
    {
      title: "Bemerkung",
      textArea: true,
    },
    {
      title: "Reinigung",
      seperator: true,
    },
    {
      title: "Kf[m/s]",
    },
  ];
};

export const frontsExtractor = (kassenzeichen) => {
  const data = kassenzeichen?.frontenArray?.map((row) => ({
    number: row?.frontObject?.nummer,
    length: row?.frontObject?.frontinfoObject?.laenge_grafik,
    class:
      row?.frontObject?.frontinfoObject?.lage_sr_satzung?.strassenreinigung
        ?.key,
    id: row?.frontObject?.id,
  }));

  return data;
};
