import { AutoComplete, Avatar, Button, Dropdown, Input, Switch } from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
import {
  addSearch,
  getPreviousSearches,
  resetStates,
  storeAenderungsAnfrage,
  storeKassenzeichen,
} from "../../store/slices/search";
import {
  getReadOnly,
  getShowChat,
  setReadOnly,
  setShowChat,
} from "../../store/slices/settings";
import { ENDPOINT, query } from "../../constants/verdis";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import {
  setBefreiungErlaubnisCollection,
  setFlaechenCollection,
  setFrontenCollection,
  setGeneralGeometryCollection,
} from "../../store/slices/mapping";

import {
  getFlaechenFeatureCollection,
  getFrontenFeatureCollection,
  getGeneralGeomfeatureCollection,
  getVersickerungsGenFeatureCollection,
} from "../../tools/featureFactories";

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
  const navigate = useNavigate();
  const mockData = extractor(dataIn);
  const location = useLocation();
  const readOnly = useSelector(getReadOnly);
  const showChat = useSelector(getShowChat);
  const jwt = useSelector(getJWT);
  const prevSearches = useSelector(getPreviousSearches);
  const [inputValue, setInpuValue] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

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

  const { data, isFetching, error } = useQuery({
    queryKey: ["kassenzeichen", searchQuery],
    queryFn: async () =>
      request(
        ENDPOINT,
        query,
        { kassenzeichen: searchQuery },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!searchQuery,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const logout = () => {
    dispatch(storeJWT(undefined));
    dispatch(storeLogin(undefined));
    dispatch(resetStates());
  };

  useEffect(() => {
    if (error && !isFetching) {
      logout();
    }
  }, [error]);

  useEffect(() => {
    if (data?.kassenzeichen?.length > 0) {
      const trimmedQuery = searchQuery.trim();
      dispatch(storeKassenzeichen(data.kassenzeichen[0]));
      dispatch(storeAenderungsAnfrage(data.aenderungsanfrage));
      if (urlParams.get("kassenzeichen") !== trimmedQuery) {
        setUrlParams({ kassenzeichen: trimmedQuery });
      }
      dispatch(addSearch(trimmedQuery));
      dispatch(resetStates());

      //create the featureCollections

      dispatch(
        setFlaechenCollection(
          getFlaechenFeatureCollection(data.kassenzeichen[0])
        )
      );
      dispatch(
        setFrontenCollection(getFrontenFeatureCollection(data.kassenzeichen[0]))
      );

      dispatch(
        setGeneralGeometryCollection(
          getGeneralGeomfeatureCollection(data.kassenzeichen[0])
        )
      );

      dispatch(
        setBefreiungErlaubnisCollection(
          getVersickerungsGenFeatureCollection(data.kassenzeichen[0])
        )
      );
    }
  }, [data]);

  useEffect(() => {
    if (urlParams.get("kassenzeichen")) {
      setSearchQuery(urlParams.get("kassenzeichen"));
    }
  }, [urlParams]);

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <img src={Logo} alt="Logo" className="h-10" />
        {mockData.map((link, i) => (
          <Link to={link.href + `?${urlParams}`} key={`navLink_${i}`}>
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
          options={prevSearches.map((kassenzeichen, i) => ({
            value: kassenzeichen,
            label: (
              <div className="flex gap-2 items-center">
                <ClockCircleOutlined className="text-lg" />
                <span className="w-full">{kassenzeichen}</span>
              </div>
            ),
          }))}
          className="xl:w-1/2 w-full mx-auto"
          defaultValue={urlParams.get("kassenzeichen")}
          onSelect={(value) => setSearchQuery(value)}
          onChange={(value) => setInpuValue(value)}
        >
          <Input
            placeholder="Suche..."
            addonAfter={
              isFetching ? (
                <LoadingOutlined />
              ) : (
                <SearchOutlined onClick={() => setSearchQuery(inputValue)} />
              )
            }
            onPressEnter={(e) => setSearchQuery(inputValue)}
            status={data?.kassenzeichen?.length === 0 && "error"}
            name="kassenzeichen"
          />
        </AutoComplete>
      </div>
      <div className="flex items-center gap-3">
        <ExclamationCircleOutlined
          className="text-2xl cursor-pointer"
          onClick={() => {
            setUrlParams({ xxx: "yyy", kassenzeichen: 60145620 });
          }}
        />
        <QuestionCircleOutlined className="text-2xl cursor-pointer" />
        <CommentOutlined
          className="text-2xl cursor-pointer"
          onClick={() => dispatch(setShowChat(!showChat))}
        />
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
