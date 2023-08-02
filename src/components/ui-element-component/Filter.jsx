import React, { useState } from "react";
import Badge from "./Badge";
import { useAppContext } from "../../state";
import useFetchFilters from "../../hooks/useFetchFilters";

const Filter = () => {
  const { filterType, setFilterType, filters, setSortField, setSortType } =
    useAppContext();
  const [fetchingBadgeIndex, setFetchingBadgeIndex] = useState(-1);
  const { isLoading: isLoadingFilters } = useFetchFilters();

  return (
    <>
      {filters &&
        filters.length &&
        !isLoadingFilters &&
        filters.map((e, index) => {
          return (
            <Badge
              loading={fetchingBadgeIndex === index}
              onClick={async () => {
                await setSortField("");
                await setSortType(1);
                await setFilterType(e.filterType.id);
                await setFetchingBadgeIndex(index);
                await new Promise((r) => setTimeout(r, 1000));

                //fetchReports()
                setFetchingBadgeIndex(-1);
              }}
              type={e.filterType.id === filterType ? "secondary" : "primary"}
              key={e.filterType.id}
              text={e.filterType.name}
              className=" mr-[26px]"
            />
          );
        })}
    </>
  );
};

export default Filter;
