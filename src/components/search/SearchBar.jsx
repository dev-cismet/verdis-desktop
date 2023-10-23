import {
  ClockCircleOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPreviousSearches, setIsLoading } from "../../store/slices/search";
import { useState } from "react";
import { useEffect } from "react";
import { useKassenzeichenSearch } from "../../hooks/useKassenzeichenSearch";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInpuValue] = useState("");

  const [urlParams, setUrlParams] = useSearchParams();
  const prevSearches = useSelector(getPreviousSearches);
  const { data, isFetching, error } = useKassenzeichenSearch(searchQuery);

  useEffect(() => {
    if (urlParams.get("kassenzeichen")) {
      setSearchQuery(urlParams.get("kassenzeichen"));
      setInpuValue(urlParams.get("kassenzeichen"));
    }
  }, [urlParams]);

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
    isFetching ? dispatch(setIsLoading(true)) : dispatch(setIsLoading(false));
  }, [isFetching]);

  return (
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
  );
};

export default SearchBar;
