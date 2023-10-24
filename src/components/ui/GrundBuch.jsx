import { BuildOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import React, { useState } from "react";

const GrundBuch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip title="Kassenzeichensuche über Buchungsblatt">
        <BuildOutlined
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Suche über Grundbuchblattnummer"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          <div className="flex gap-2 items-center">
            <Input /> {" - "} <Input /> <Button>Kassenzeichen suchen</Button>
          </div>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <p>
            Geben Sie eine Grundbuchblattnummer ein, um nach Kassenzeichen zu
            suchen.
          </p>
          <p>Beispiel: 053279-004835</p>
        </div>
      </Modal>
    </>
  );
};

export default GrundBuch;
