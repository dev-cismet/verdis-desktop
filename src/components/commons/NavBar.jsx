import { Avatar, Button, Dropdown, Input, Switch } from "antd";
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
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
import { storeKassenzeichen, storeSearchTerm } from "../../store/slices/search";
import { getReadOnly, setReadOnly } from "../../store/slices/settings";
import { ENDPOINT, query } from "../../constants/verdis";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const mockExtractor = (input) => {
  return [
    {
      title: "Übersicht",
      href: "/",
      icon: <HomeOutlined className="text-2xl" />,
    },
    {
      title: "Versiegelte Flächen",
      href: "/versiegelteFlaechen",
      icon: <GatewayOutlined className="text-2xl" />,
    },
    {
      title: "Straßenreinigung",
      href: "/strassenreinigung",
      icon: <PullRequestOutlined className="text-2xl" />,
    },
    {
      title: "Info",
      href: "/info",
      icon: <GlobalOutlined className="text-2xl" />,
    },
    {
      title: "Versickerungsgenehmigungen",
      href: "/versickerungsgenehmigungen",
      icon: <LinkOutlined className="text-2xl" />,
    },
  ];
};

const NavBar = ({
  dataIn,
  extractor = mockExtractor,
  width = "100%",
  height = 73,
  style,
  inStory,
}) => {
  const dispatch = useDispatch();
  const mockData = extractor(dataIn);
  const location = useLocation();
  const readOnly = useSelector(getReadOnly);
  const jwt = useSelector(getJWT);
  const [prevSearches, setPrevSearches] = useState([]);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    {
      label: <a href="/settings">Einstellungen</a>,
      key: "0",
    },
    {
      label: (
        <Switch
          onClick={() => dispatch(setReadOnly(!readOnly))}
          checked={!readOnly}
        />
      ),
      key: "1",
    },
    {
      label: <Button onClick={() => logout()}>Ausloggen</Button>,
      key: "2",
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

  const onSearch = (value) => {
    if (value) setPrevSearches([...prevSearches, value]);
    dispatch(storeSearchTerm(value));
    setSearchTerm(value);
  };

  const logout = () => {
    dispatch(storeJWT(undefined));
    dispatch(storeLogin(undefined));
  };

  const { data } = useQuery({
    queryKey: ["kassenzeichen", searchTerm],
    queryFn: async () =>
      request(
        ENDPOINT,
        query,
        { kassenzeichen: searchTerm },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!searchTerm,
  });
  dispatch(storeKassenzeichen(data));

  return (
    <header
      className="flex items-center justify-between bg-white p-2"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <FontAwesomeIcon icon={faGripVertical} className="w-6 h-6" />
        <img src={Logo} alt="Logo" className="h-10" />
        {mockData.map((link, i) => (
          <Link to={link.href} key={`navLink_${i}`}>
            <Button
              type="text"
              className={`${
                (location.pathname.includes(link.href) && i > 0) ||
                (link.href === "/" && location.pathname === "/")
                  ? "text-primary"
                  : ""
              } font-semibold no-underline`}
            >
              <div className="lg:hidden block">{link.icon}</div>
              <div className="hidden lg:block">{link.title}</div>
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex relative items-center gap-3 w-full">
        <Input.Search
          placeholder="Suche..."
          allowClear
          onSearch={(value) => onSearch(value)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="lg:w-1/2 w-full mx-auto"
        />
        <div
          className={`bg-white border border-solid rounded-md shadow-md border-gray-300 absolute left-1/4 top-10 z-[99999] ${
            isFocused && prevSearches.length > 0 ? "flex" : "hidden"
          } flex-col gap-1 lg:w-1/2 w-full`}
        >
          {prevSearches.map((prevSearch, i) => (
            <div
              className="hover:bg-zinc-100 cursor-pointer p-1"
              key={`prevSearches_${i}`}
              onClick={() => setSearch(prevSearch)}
            >
              <div className="flex gap-2 items-center group px-2 z-50">
                <ClockCircleOutlined className="text-lg" />
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
