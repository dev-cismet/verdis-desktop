import { Avatar, Button, Dropdown, Input, Layout } from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGripVertical, faX } from "@fortawesome/free-solid-svg-icons";
import {
  ClockCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  GatewayOutlined,
  GlobalOutlined,
  HomeOutlined,
  LinkOutlined,
  PullRequestOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

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
  width = 1024,
  height = 73,
  style,
  inStory,
  highlightedItem = 0,
}) => {
  const data = extractor(dataIn);
  const items = [
    {
      label: <a href="/settings">Einstellungen</a>,
      key: "0",
    },
    {
      label: <a href="/">Ausloggen</a>,
      key: "1",
    },
  ];

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }
  const navRef = useRef(null);

  const [prevSearches, setPrevSearches] = useState([]);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [navWidth, setNavWidth] = useState(width);

  useEffect(() => {
    const setWidth = () => {
      setNavWidth(navRef?.current?.offsetWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    <header
      className="flex items-center justify-between bg-white p-2"
      style={{ ...style, ...storyStyle, width, height }}
      ref={navRef}
    >
      <div className="md:flex hidden items-center gap-3">
        <FontAwesomeIcon icon={faGripVertical} className="w-6 h-6" />
        <img src={Logo} alt="Logo" className="h-10" />
        {data.map((link, i) => (
          <Button
            type="text"
            key={`navLink_${i}`}
            className={`${
              i === highlightedItem ? "text-primary" : ""
            } font-semibold`}
            href={link.href}
          >
            {navWidth >= 1440 ? link.title : link.icon}
          </Button>
        ))}
      </div>
      <div className="flex relative items-center gap-3 w-full px-16">
        <Input.Search
          placeholder="Suche..."
          allowClear
          onSearch={() => setPrevSearches([...prevSearches, search])}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div
          className={`bg-white border border-solid rounded-md shadow-md border-gray-300 absolute top-10 z-[99999] ${
            isFocused && prevSearches.length > 0 ? "flex" : "hidden"
          } flex-col w-[calc(100%-114px)]`}
        >
          {prevSearches.map((prevSearch, i) => (
            <div
              className="hover:bg-zinc-100 cursor-pointer"
              key={`prevSearches_${i}`}
              onClick={() => setSearch(prevSearch)}
            >
              <div className="flex gap-2 items-center group px-2 z-50">
                <ClockCircleOutlined className="text-xl" />
                <span className="w-full">{prevSearch}</span>
                <FontAwesomeIcon
                  className="group-hover:visible invisible hover:bg-zinc-200 p-2"
                  icon={faX}
                  onClick={() => {
                    setPrevSearches((prevSearch) => prevSearch.splice(i, 1));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
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
    </header>
  );
};

export default NavBar;
