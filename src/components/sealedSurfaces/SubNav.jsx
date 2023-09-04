import DetailSwitcher from "../commons/DetailSwitcher";

const SubNav = () => {
  return (
    <DetailSwitcher
      title="Versiegelte Flächen"
      buttonName="Flächen"
      baseRoute="/versiegelteFlaechen"
    />
  );
};

export default SubNav;
