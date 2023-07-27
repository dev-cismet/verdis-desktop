import { Checkbox, Table } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return {
    dataSource: [
      {
        key: "1",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: true,
      },
      {
        key: "2",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: true,
      },
      {
        key: "3",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: false,
      },
      {
        key: "4",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: false,
      },
      {
        key: "5",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: false,
      },
      {
        key: "6",
        name: "2173862/0(PRl)",
        seepageFrom: "21.07.2018",
        seepageUntil: "23.08.2020",
        useCase: "Wohnen",
        type: "Seepage",
        seepage: "1.234",
        gVerth: true,
      },
    ],
    columns: [
      {
        title: "Aktenzeichen",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Antrag vom",
        dataIndex: "seepageFrom",
        key: "seepageFrom",
      },
      {
        title: "gültig bis",
        dataIndex: "seepageUntil",
        key: "seepageUntil",
      },
      {
        title: "Nutzung",
        dataIndex: "useCase",
        key: "useCase",
      },
      {
        title: "Typ",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Q[l/s]",
        dataIndex: "seepage",
        key: "seepage",
      },
      {
        title: "G-Verth",
        dataIndex: "gVerth",
        key: "gVerth",
        render: (gVerth) => (
          <Checkbox checked={gVerth} className="flex justify-center" />
        ),
      },
    ],
  };
};

const Exemption = ({
  dataIn,
  extractor = mockExtractor,
  width = 900,
  height = 400,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Befreiung/Erlaubnis">
      <Table
        dataSource={data.dataSource}
        columns={data.columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </CustomCard>
  );
};

export default Exemption;
