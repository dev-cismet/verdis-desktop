import { BuildOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getBuchungsblatt,
  getBuchungsblattnummer,
  getKassenzeichenBuchungsblatt,
  searchForKassenzeichen,
  storeBuchungsblatt,
} from "../../store/slices/search";
import { getJWT } from "../../store/slices/auth";
import { useSearchParams } from "react-router-dom";

const GrundBuch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const jwt = useSelector(getJWT);
  const dispatch = useDispatch();
  const [selectedKassenzeichen, setSelectedKassenzeichen] = useState("");
  const [grundBuchNumber, setGrundBuchNumber] = useState("");
  const grundbuch = useSelector(getBuchungsblattnummer);
  const kassenzeichenList = useSelector(getKassenzeichenBuchungsblatt);
  const [urlParams, setUrlParams] = useSearchParams();

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

  const getFirstNumber = (number) => {
    if (number.toString().length < 5) {
      return "05" + number;
    }

    return number;
  };

  const getSecondNumber = (number) => {
    let paddedNumber = number.toString();
    while (paddedNumber.length < 6) {
      paddedNumber = "0" + paddedNumber;
    }

    return paddedNumber;
  };

  const onSubmit = (data) => {
    const firstNumber = getFirstNumber(data.firstNumber);
    const secondNumber = getSecondNumber(data.secondNumber);

    setGrundBuchNumber(data.firstNumber + "-" + data.secondNumber);
    dispatch(getBuchungsblatt(firstNumber + "-" + secondNumber));
  };

  return (
    <>
      <Tooltip title="Kassenzeichensuche über Buchungsblatt">
        <BuildOutlined
          className="text-2xl cursor-pointer"
          onClick={() => {
            setIsOpen(true);
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
          grundbuch ? (
            <Button
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                dispatch(
                  searchForKassenzeichen(
                    selectedKassenzeichen.toString(),
                    urlParams,
                    setUrlParams
                  )
                );
              }}
            >
              Kassenzeichen öffnen
            </Button>
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
        {grundbuch ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full justify-between">
              <span className="text-lg">Grundbuchblatt: {grundBuchNumber}</span>
              <div className="flex gap-2">
                <Button
                  icon={<SnippetsOutlined />}
                  target="grundbuch"
                  href={`http://localhost:3033/renderer/?domain=WUNDA_BLAU&jwt=${jwt}&table=alkis_buchungsblatt&id=${grundbuch.id}`}
                />
                <Button
                  onClick={() => dispatch(storeBuchungsblatt(null))}
                  icon={<BuildOutlined />}
                />
              </div>
            </div>
            <p className="w-full text-center">
              {kassenzeichenList?.length} Kassenzeichen gefunden
            </p>
            <div className="flex flex-col border bg-zinc-100 h-52">
              {kassenzeichenList.map((kassenzeichen, i) => (
                <div
                  key={`foundKassenzeichen_${i}`}
                  onClick={() =>
                    setSelectedKassenzeichen(kassenzeichen.kassenzeichennummer8)
                  }
                  className={`p-1 cursor-pointer ${
                    kassenzeichen.kassenzeichennummer8 === selectedKassenzeichen
                      ? "bg-primary/20"
                      : "hover:bg-zinc-200"
                  }`}
                >
                  {kassenzeichen.kassenzeichennummer8}
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
            <p>Beispiel: 3279-4835</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default GrundBuch;
