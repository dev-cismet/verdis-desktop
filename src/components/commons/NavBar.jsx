import { Avatar, Button, Input, Layout } from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  CommentOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const mockExtractor = (input) => {
  return [
    {
      title: "Übersicht",
      href: "/",
    },
    {
      title: "Versiegelte Flächen",
      href: "/",
    },
    {
      title: "Straßenreinigung",
      href: "/",
    },
    {
      title: "Allgemein",
      href: "/",
    },
    {
      title: "Versickerungsgenehmigungen",
      href: "/",
    },
  ];
};

const NavBar = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width,
        height,
      }}
    >
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faGripVertical} className="w-6 h-6" />
        <img src={Logo} alt="Logo" className="h-10" />
        {data.map((link, i) => (
          <Button
            type="text"
            key={`navLink_${i}`}
            className={`${i === 0 ? "text-primary" : ""} font-semibold`}
            href={link.href}
          >
            {link.title}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-3 w-1/4">
        <Input
          placeholder="Suche..."
          addonBefore={
            <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
          }
          allowClear
        />
      </div>
      <div className="flex items-center gap-3">
        <ExclamationCircleOutlined className="text-2xl cursor-pointer" />
        <QuestionCircleOutlined className="text-2xl cursor-pointer" />
        <CommentOutlined className="text-2xl cursor-pointer" />
        <LogoutOutlined className="text-2xl cursor-pointer" />
        <Avatar
          size="large"
          icon={<FontAwesomeIcon icon={faUser} />}
          className="cursor-pointer"
        />
      </div>
    </Layout.Header>
  );
};

export default NavBar;
