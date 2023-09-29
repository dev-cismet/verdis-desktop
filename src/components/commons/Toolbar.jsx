const Toolbar = ({ kassenzeichen, anschlussgrad, bezeichnung }) => {
  return (
    <div className="absolute bottom-[2px] left-[5px] bg-white w-fit px-2 z-50">
      {kassenzeichen && "Kassenzeichen: " + kassenzeichen + "::" + bezeichnung}
      {kassenzeichen && anschlussgrad && " - "}
      {anschlussgrad && anschlussgrad}
    </div>
  );
};

export default Toolbar;
