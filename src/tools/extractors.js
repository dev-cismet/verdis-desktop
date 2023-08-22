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
      front.frontObject.frontinfoObject.lage_sr_satzung.strassenreinigung.key +
      "-" +
      front.frontObject.frontinfoObject.lage_sr_satzung.strassenreinigung
        .schluessel,
    streetNumber: front.frontObject.frontinfoObject.strasseObject.schluessel,
    streetName: front.frontObject.frontinfoObject.strasseObject.name,
    length: front.frontObject.frontinfoObject.laenge_grafik,
  }));

  return data;
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
