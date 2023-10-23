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
  getPreviousSearches,
  resetStates,
  setIsLoading,
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
import { useKassenzeichenSearch } from "../../hooks/useKassenzeichenSearch";
import PdfCreator from "../ui/PdfCreator";
import {
  getShowCurrentFeatureCollection,
  setShowCurrentFeatureCollection,
} from "../../store/slices/mapping";
import Settings from "./Settings";

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
      icon: (
        <Tooltip title="Versiegelte Flächen" placement="bottom">
          <FontAwesomeIcon icon={faCloudRain} className="h-6" />
        </Tooltip>
      ),
    },
    {
      title: "Straßenreinigung",
      href: showFrontDetails
        ? "/strassenreinigung/details"
        : "/strassenreinigung",
      icon: (
        <Tooltip title="Straßenreinigung" placement="bottom">
          <FontAwesomeIcon icon={faBroom} className="h-6" />
        </Tooltip>
      ),
    },
    {
      title: "Info",
      href: "/info",
      icon: (
        <Tooltip title="Info" placement="bottom">
          <FontAwesomeIcon icon={faTag} className="h-6" />
        </Tooltip>
      ),
    },
    {
      title: "Versickerungsgenehmigungen",
      href: showSeepageDetails
        ? "/versickerungsgenehmigungen/details"
        : "/versickerungsgenehmigungen",
      icon: (
        <Tooltip title="Versickerungsgenehmigungen" placement="bottom">
          <FontAwesomeIcon icon={faEarthAmericas} className="h-6" />
        </Tooltip>
      ),
    },
  ];
};

const NavBar = ({ width = "100%", height = 73, style, inStory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = navLinks();
  const location = useLocation();
  const showChat = useSelector(getShowChat);
  const prevSearches = useSelector(getPreviousSearches);
  const [inputValue, setInpuValue] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, isFetching, error } = useKassenzeichenSearch(searchQuery);

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

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
          <div
            className="flex gap-2 items-center h-full cursor-pointer"
            onClick={() => navigate("/" + `?${urlParams}`)}
          >
            <img src={Logo} alt="Logo" className="h-10" />
            <span
              className={`${
                location.pathname === "/" ? "text-primary" : ""
              } font-semibold no-underline pt-1`}
            >
              VerDIS
            </span>
          </div>
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
        <PdfCreator />
        <Tooltip title="Änderungsanfragen" placement="bottom">
          <CommentOutlined
            className="text-2xl cursor-pointer"
            onClick={() => dispatch(setShowChat(!showChat))}
          />
        </Tooltip>
        <Tooltip title="Ausloggen" placement="bottom">
          <LogoutOutlined
            className="text-2xl cursor-pointer"
            onClick={() => logout()}
          />
        </Tooltip>
        <Tooltip title="Einstellungen" placement="bottom">
          <Avatar
            size="large"
            icon={<FontAwesomeIcon icon={faUser} />}
            className="cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />
        </Tooltip>
        <Drawer
          title="Einstellungen"
          placement="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          size="large"
        >
          <Settings />
        </Drawer>
      </div>
    </header>
  );
};

export default NavBar;
