import React, { useEffect, useState } from "react";

import { downloadReport } from "../../api";
import useFetchReport from "../../hooks/useFetchReport";
import useFetchStates from "../../hooks/useFetchStates";
import { useAppContext } from "../../state";
import formatDate from "../../utils/formatDate";
import Badge from "../ui-element-component/Badge";
import Button from "../ui-element-component/Button";
import CalendarBuilder from "../ui-element-component/CalendarBuilder";
import Select from "../ui-element-component/Select";

const Sidebar = () => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setCurrentState,
    currentState,
    filterType,
    setSortField,
    setSortType,
  } = useAppContext();
  const { data, isLoading } = useFetchStates();
  const { refetchGroup, isLoadingGroup } = useFetchReport();
  const [minDate, setMindate] = useState(null);

  const [defaultIndex, setDefaultIndex] = useState(0);

  useEffect(() => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    setMindate(date);
  }, [endDate, startDate]);

  useEffect(() => {
    const state = localStorage.getItem("state");
    if (state && data) {
      const oldState = JSON.parse(state);
      const previousState = data.find((e) => e.id === oldState.id);
      const previousStateIndex = data.findIndex((e) => e.id === oldState.id);
      setDefaultIndex(previousStateIndex);
      setCurrentState(previousState);

      //SET DATE
      setStartDate(formatDate(localStorage.getItem("startDate")));
      setEndDate(formatDate(localStorage.getItem("endDate")));
    }
    // eslint-disable-next-line
  }, [data, setCurrentState]);
  //

  function onChangeCountry(country) {
    setCurrentState(country);
  }

  async function getReportsListOnClick() {
    await setSortField("");
    await setSortType(1);
    //THIS WILL MAKE TWO REQUESTS
    refetchGroup();
  }

  return (
    <aside className=" h-[calc(100vh-125px)] max-w-[260px] flex flex-col items-center">
      <div className=" mb-6">
        {!isLoading && data && (
          <Select
            key={defaultIndex}
            defaultIndex={defaultIndex}
            items={data}
            onChange={onChangeCountry}
          />
        )}
      </div>

      <div className=" mb-6">
        <CalendarBuilder currentDate={startDate} onChange={setStartDate} />
      </div>

      <div className=" mb-6">
        <CalendarBuilder
          minDate={minDate}
          currentDate={endDate}
          onChange={setEndDate}
        />
      </div>

      <div className=" mt-6">
        <Button
          loaderSize={18}
          isLoading={isLoadingGroup}
          onClick={getReportsListOnClick}
          text="Generate report"
        />
      </div>

      <div className="mt-auto flex">
        <Badge
          onClick={() => {
            downloadReport({
              startDate,
              endDate,
              state: currentState,
              filterType,
              format: 2,
            });
          }}
          className="mr-2"
          text="Export as CSV"
        />

        <Badge
          onClick={() => {
            downloadReport({
              startDate,
              endDate,
              state: currentState,
              filterType,
              format: 1,
            });
          }}
          text="Export as XLS"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
