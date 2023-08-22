import { AutoComplete, Avatar, Button, Dropdown, Input, Switch } from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faX } from "@fortawesome/free-solid-svg-icons";
import {
  ClockCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  GatewayOutlined,
  GlobalOutlined,
  HomeOutlined,
  LinkOutlined,
  LoadingOutlined,
  PullRequestOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
import {
  storeAenderungsAnfrage,
  storeKassenzeichen,
  storeSearchTerm,
} from "../../store/slices/search";
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
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("kassenzeichen"));

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

  const { data, isFetching } = useQuery({
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

  const onSearch = (value) => {
    dispatch(storeSearchTerm(value));
    setSearchTerm(value);
  };

  const logout = () => {
    dispatch(storeJWT(undefined));
    dispatch(storeLogin(undefined));
  };

  useEffect(() => {
    if (data?.kassenzeichen?.length > 0) {
      dispatch(storeKassenzeichen(data.kassenzeichen[0]));
      dispatch(storeAenderungsAnfrage(data.aenderungsanfrage));
      setParams({ kassenzeichen: searchTerm.trim() });
      setPrevSearches([...new Set([...prevSearches, searchTerm.trim()])]);
    }
  }, [data]);

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <img src={Logo} alt="Logo" className="h-10" />
        {mockData.map((link, i) => (
          <Link to={link.href + `?${params}`} key={`navLink_${i}`}>
            <Button
              type="text"
              className={`${
                (location.pathname.includes(link.href) && i > 0) ||
                (link.href === "/" && location.pathname === "/")
                  ? "text-primary"
                  : ""
              } font-semibold no-underline`}
            >
              <div className="xl:hidden block">{link.icon}</div>
              <div className="hidden xl:block">{link.title}</div>
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex relative items-center gap-3 w-full">
        <AutoComplete
          options={prevSearches.map((prev) => ({
            value: prev,
            label: (
              <div className="flex gap-2 items-center group">
                <ClockCircleOutlined className="text-lg" />
                <span className="w-full">{prev}</span>
                <FontAwesomeIcon
                  className="group-hover:visible invisible hover:bg-zinc-200 p-2"
                  icon={faX}
                />
              </div>
            ),
          }))}
          className="xl:w-1/2 w-full mx-auto"
          defaultValue={params.get("kassenzeichen")}
          onSelect={(value) => setSearchTerm(value)}
          onChange={(value) => setSearch(value)}
        >
          <Input
            placeholder="Suche..."
            defaultValue={params.get("kassenzeichen")}
            value={params.get("kassenzeichen")}
            addonAfter={
              isFetching ? (
                <LoadingOutlined />
              ) : (
                <SearchOutlined onClick={() => onSearch(search)} />
              )
            }
            onPressEnter={() => onSearch(search)}
            status={data?.kassenzeichen?.length === 0 && "error"}
            name="kassenzeichen"
          />
        </AutoComplete>
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
