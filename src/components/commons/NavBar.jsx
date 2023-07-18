import { Avatar, Button, Dropdown, Input, Layout } from "antd";
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
  GatewayOutlined,
  GlobalOutlined,
  HomeOutlined,
  LinkOutlined,
  PullRequestOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const mockExtractor = (input) => {
  return [
    {
      title: "Übersicht",
      href: "/",
      icon: <HomeOutlined className="text-2xl" />,
    },
    {
      title: "Versiegelte Flächen",
      href: "/",
      icon: <GatewayOutlined className="text-2xl" />,
    },
    {
      title: "Straßenreinigung",
      href: "/",
      icon: <PullRequestOutlined className="text-2xl" />,
    },
    {
      title: "Info",
      href: "/",
      icon: <GlobalOutlined className="text-2xl" />,
    },
    {
      title: "Versickerungsgenehmigungen",
      href: "/",
      icon: <LinkOutlined className="text-2xl" />,
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
  const items = [
    {
      label: <a href="/settings">Einstellungen</a>,
      key: "0",
    },
    {
      label: <a href="/">Log out</a>,
      key: "1",
    },
  ];

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
            {width >= 1440 ? link.title : link.icon}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-3 w-full px-16">
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
        <Dropdown trigger={["click"]} menu={{ items }} placement="bottomRight">
          <Avatar
            size="large"
            icon={<FontAwesomeIcon icon={faUser} />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default NavBar;
