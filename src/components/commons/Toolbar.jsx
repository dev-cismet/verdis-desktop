const Toolbar = ({ kassenzeichen, anschlussgrad }) => {
  return (
    <div className="absolute bottom-[2px] left-[5px] bg-white w-fit px-2 z-50">
      {kassenzeichen && "Kassenzeichen: " + kassenzeichen}
      {kassenzeichen && anschlussgrad && " - "}
      {anschlussgrad && anschlussgrad}
    </div>
  );
};

export default Toolbar;
