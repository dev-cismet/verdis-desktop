import {
  AutoComplete,
  Avatar,
  Button,
  Drawer,
  Input,
  Switch,
  Tooltip,
} from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faCloudRain,
  faEarthAmericas,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  ClockCircleOutlined,
  CommentOutlined,
  LoadingOutlined,
  LogoutOutlined,
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
  setIsLoading,
  storeAenderungsAnfrage,
  storeKassenzeichen,
} from "../../store/slices/search";
import {
  getShowChat,
  getShowFrontDetails,
  getShowSeepageDetails,
  getShowSurfaceDetails,
  getSyncKassenzeichen,
  setShowChat,
  setSyncKassenzeichen,
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

const navLinks = () => {
  const showSurfaceDetails = useSelector(getShowSurfaceDetails);
  const showFrontDetails = useSelector(getShowFrontDetails);
  const showSeepageDetails = useSelector(getShowSeepageDetails);

  return [
    {
      title: "Versiegelte Flächen",
      href: showSurfaceDetails
        ? "/versiegelteFlaechen/details"
        : "/versiegelteFlaechen",
      icon: <FontAwesomeIcon icon={faCloudRain} className="h-6" />,
    },
    {
      title: "Straßenreinigung",
      href: showFrontDetails
        ? "/strassenreinigung/details"
        : "/strassenreinigung",
      icon: <FontAwesomeIcon icon={faBroom} className="h-6" />,
    },
    {
      title: "Info",
      href: "/info",
      icon: <FontAwesomeIcon icon={faTag} className="h-6" />,
    },
    {
      title: "Versickerungsgenehmigungen",
      href: showSeepageDetails
        ? "/versickerungsgenehmigungen/details"
        : "/versickerungsgenehmigungen",
      icon: <FontAwesomeIcon icon={faEarthAmericas} className="h-6" />,
    },
  ];
};

const NavBar = ({ width = "100%", height = 73, style, inStory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = navLinks();
  const location = useLocation();
  const showChat = useSelector(getShowChat);
  const jwt = useSelector(getJWT);
  const prevSearches = useSelector(getPreviousSearches);
  const syncKassenzeichen = useSelector(getSyncKassenzeichen);
  const [inputValue, setInpuValue] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    enabled: !!searchQuery && !isNaN(+searchQuery),
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
      const trimmedQuery = searchQuery.trim();
      setUrlParams({ kassenzeichen: trimmedQuery });
      setTimeout(() => {
        logout();
      }, 10);
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

      if (syncKassenzeichen) {
        fetch(
          "http://localhost:18000/gotoKassenzeichen?kassenzeichen=" +
            trimmedQuery
        ).catch((error) => {
          //  i expect an error here
        });
      }

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
      setInpuValue(urlParams.get("kassenzeichen"));
    }
  }, [urlParams]);

  useEffect(() => {
    isFetching ? dispatch(setIsLoading(true)) : dispatch(setIsLoading(false));
  }, [isFetching]);

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <Tooltip title="Übersicht" placement="bottom">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/" + `?${urlParams}`)}
          />
        </Tooltip>
        {links.map((link, i) => (
          <Link to={link.href + `?${urlParams}`} key={`navLink_${i}`}>
            <Button
              type="text"
              className={`${
                location.pathname.includes(link.href) ? "text-primary" : ""
              } font-semibold no-underline`}
            >
              <div
                className={`xl:hidden block ${
                  (location.pathname.includes(link.href) && i > 0) ||
                  (link.href === "/" && location.pathname === "/")
                    ? "text-primary"
                    : ""
                }`}
              >
                {link.icon}
              </div>
              <div className="hidden xl:block">{link.title}</div>
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex relative items-center gap-3 w-full">
        <AutoComplete
          options={prevSearches
            .map((kassenzeichen) =>
              kassenzeichen !== searchQuery
                ? {
                    value: kassenzeichen,
                    label: (
                      <div className="flex gap-2 items-center">
                        <ClockCircleOutlined className="text-lg" />
                        <span className="w-full">{kassenzeichen}</span>
                      </div>
                    ),
                  }
                : null
            )
            .filter((item) => item !== null)}
          className="xl:w-1/2 w-full mx-auto"
          value={inputValue}
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
            status={
              (data?.kassenzeichen?.length === 0 || isNaN(+searchQuery)) &&
              "error"
            }
            name="kassenzeichen"
          />
        </AutoComplete>
      </div>
      <div className="flex items-center gap-3">
        <CommentOutlined
          className="text-2xl cursor-pointer"
          onClick={() => dispatch(setShowChat(!showChat))}
        />
        <LogoutOutlined
          className="text-2xl cursor-pointer"
          onClick={() => logout()}
        />
        <Avatar
          size="large"
          icon={<FontAwesomeIcon icon={faUser} />}
          className="cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        />
        <Drawer
          title="Einstellungen"
          placement="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          size="large"
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h3>Allgemein</h3>
              <div
                className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
                onClick={() =>
                  dispatch(setSyncKassenzeichen(!syncKassenzeichen))
                }
              >
                <span>Kassenzeichen mit Java Anwendung synchronisieren</span>
                <Switch className="w-fit" checked={syncKassenzeichen} />
              </div>
            </div>
            <h3>Karte</h3>
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default NavBar;
