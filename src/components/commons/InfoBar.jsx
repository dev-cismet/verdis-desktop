const InfoBar = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h4>{title}</h4>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default InfoBar;
