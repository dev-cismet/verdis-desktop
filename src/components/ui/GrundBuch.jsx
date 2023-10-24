import { BuildOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import React, { useState } from "react";

const GrundBuch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKassenzeichenList, setShowKassenzeichenList] = useState(false);
  const [kassenzeichenList, setKassenzeichenList] = useState([
    "12345678",
    "23456789",
    "34567890",
  ]);
  const [selectedKassenzeichen, setSelectedKassenzeichen] = useState("");

  const search = (input) => {
    if (input) {
      setShowKassenzeichenList(true);
    }
  };

  return (
    <>
      <Tooltip title="Kassenzeichensuche über Buchungsblatt">
        <BuildOutlined
          className="text-2xl cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setShowKassenzeichenList(false);
            setSelectedKassenzeichen("");
          }}
        />
      </Tooltip>
      <Modal
        title="Suche über Grundbuchblattnummer"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          showKassenzeichenList ? (
            <Button className="w-full">Kassenzeichen öffnen</Button>
          ) : (
            <div className="flex gap-2 items-center">
              <Input /> {" - "} <Input />{" "}
              <Button onClick={() => search("12345-12345")}>
                Kassenzeichen suchen
              </Button>
            </div>
          ),
        ]}
      >
        {showKassenzeichenList ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full justify-between">
              <span className="text-lg">Grundbuchblatt: 12345-12345</span>
              <div className="flex gap-2">
                <Button disabled={true}>
                  <SnippetsOutlined />
                </Button>
                <Button disabled={true}>
                  <BuildOutlined />
                </Button>
              </div>
            </div>
            <p className="w-full text-center">3 Kassenzeichen gefunden</p>
            <div className="flex flex-col border bg-zinc-100 h-52">
              {kassenzeichenList.map((kassenzeichen) => (
                <div
                  onClick={() => setSelectedKassenzeichen(kassenzeichen)}
                  className={`p-1 cursor-pointer hover:bg-zinc-200 ${
                    kassenzeichen === selectedKassenzeichen && "bg-primary/20"
                  }`}
                >
                  {kassenzeichen}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p>
              Geben Sie eine Grundbuchblattnummer ein, um nach Kassenzeichen zu
              suchen.
            </p>
            <p>Beispiel: 053279-004835</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default GrundBuch;
