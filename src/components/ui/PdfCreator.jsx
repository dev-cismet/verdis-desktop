import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const ModalRow = ({ title, children }) => {
  return (
    <div className="flex w-full">
      <span className="w-1/3">{title}</span>
      {children}
    </div>
  );
};

const PdfCreator = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FilePdfOutlined
        className="text-2xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        title="Flächenerfassungsbogen - Report Parameter"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button onClick={() => setIsOpen(false)}>Abbrechen</Button>,
          <Button type="primary">Erstelle Report</Button>,
        ]}
      >
        <div className="flex flex-col w-full gap-4 py-2">
          <ModalRow title="Hinweise">
            <TextArea className="w-full" />
          </ModalRow>
          <ModalRow title="Maßstab">
            <Select
              className="w-full"
              defaultValue="optimal"
              options={[
                {
                  value: "optimal",
                  label: "optimal",
                },
                {
                  value: "1:200",
                  label: "1:200",
                },
                {
                  value: "1:300",
                  label: "1:300",
                },
                {
                  value: "1:400",
                  label: "1:400",
                },
                {
                  value: "1:500",
                  label: "1:500",
                },
                {
                  value: "1:750",
                  label: "1:750",
                },
                {
                  value: "1:1000",
                  label: "1:1000",
                },
              ]}
            />
          </ModalRow>
          <ModalRow title="Format">
            <Radio.Group className="w-full">
              <Radio value={"optimal"}>optimal</Radio>
              <Radio value={"a4"}>A4</Radio>
              <Radio value={"a3"}>A3</Radio>
            </Radio.Group>
          </ModalRow>
          <ModalRow title="Orientierung">
            <Radio.Group className="w-full">
              <Radio value={"optimal"}>optimal</Radio>
              <Radio value={"hochformat"}>Hochformat</Radio>
              <Radio value={"querformat"}>Querformat</Radio>
            </Radio.Group>
          </ModalRow>
          <ModalRow>
            <Checkbox className="w-full">
              Abflusswirksamkeiten ausfüllen
            </Checkbox>
          </ModalRow>
        </div>
      </Modal>
    </>
  );
};

export default PdfCreator;
