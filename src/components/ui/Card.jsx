import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
const CustomCard = ({ style, title, children, fullHeight, ...props }) => {
  return (
    <Card
      style={style}
      bodyStyle={{
        overflowY: "auto",
        maxHeight: fullHeight ? "100%" : "calc(100% - 45px)",
      }}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> {title}
        </span>
      }
      size="small"
      hoverable={false}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
