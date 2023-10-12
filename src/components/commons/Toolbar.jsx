const Toolbar = ({ kassenzeichen, anschlussgrad, bezeichnung }) => {
  return (
    <div className="absolute bottom-0 text-lg left-0 bg-white w-fit px-2 z-[9999] pointer-events-none">
      {kassenzeichen && "Kassenzeichen: " + kassenzeichen + "::" + bezeichnung}
      {kassenzeichen && anschlussgrad && " - "}
      {anschlussgrad && anschlussgrad}
    </div>
  );
};

export default Toolbar;
