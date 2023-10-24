import { BuildOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const GrundBuch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKassenzeichenList, setShowKassenzeichenList] = useState(false);
  const [kassenzeichenList, setKassenzeichenList] = useState([
    "12345678",
    "23456789",
    "34567890",
  ]);
  const [selectedKassenzeichen, setSelectedKassenzeichen] = useState("");
  const [grundBuchNumber, setGrundBuchNumber] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      firstNumber: "",
      secondNumber: "",
    },
  });
  const onSubmit = (data) => {
    setGrundBuchNumber(data.firstNumber + "-" + data.secondNumber);
    setShowKassenzeichenList(true);
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
            clearErrors();
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
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-2 items-center"
              >
                <Controller
                  rules={{ required: true }}
                  name="firstNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} status={errors.firstNumber && "error"} />
                  )}
                />
                {" - "}
                <Controller
                  rules={{ required: true }}
                  name="secondNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} status={errors.secondNumber && "error"} />
                  )}
                />
                <Button htmlType="submit">Kassenzeichen suchen</Button>
              </form>
              {(errors.firstNumber || errors.secondNumber) && (
                <p className="text-center text-red-500 pt-1 pb-0">
                  Bitte zwei gültige Zahlen eingeben
                </p>
              )}
            </>
          ),
        ]}
      >
        {showKassenzeichenList ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full justify-between">
              <span className="text-lg">Grundbuchblatt: {grundBuchNumber}</span>
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
              {kassenzeichenList.map((kassenzeichen, i) => (
                <div
                  key={`foundKassenzeichen_${i}`}
                  onClick={() => setSelectedKassenzeichen(kassenzeichen)}
                  className={`p-1 cursor-pointer ${
                    kassenzeichen === selectedKassenzeichen
                      ? "bg-primary/20"
                      : "hover:bg-zinc-200"
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
