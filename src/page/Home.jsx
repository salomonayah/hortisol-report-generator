import React, { useEffect, useState } from "react";
import Dashboard from "../components/layout/Dashboard";
import Badge from "../components/ui-element-component/Badge";
import Table from "../components/ui-element-component/Table";
import useFetchFilters from "../hooks/useFetchFilters";
import useFetchReport from "../hooks/useFetchReport";
import { useAppContext } from "../state";
import { Oval } from "react-loader-spinner";

function EmptyParentBlock({ children }) {
  return (
    <>
      <div className="h-[calc(70vh-50px)] flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <EmptyParentBlock>
      <h1 className="font-bold">No reports generated</h1>
      <p>Choose parameters and generate the first one</p>
    </EmptyParentBlock>
  );
}

function LoadingBlock() {
  return (
    <EmptyParentBlock>
      <Oval
        height={24}
        width={24}
        color="#F5FFF2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="red"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </EmptyParentBlock>
  );
}

const Home = () => {
  const {
    filterType,
    setFilterType,
    reports,
    filters,
    setSortField,
    setSortType,
  } = useAppContext();
  const { isLoading, fetchReports } = useFetchReport(filterType);
  const { isLoading: isLoadingFilters } = useFetchFilters();
  const [totals, setTotal] = useState([]);
  const [column, setColum] = useState([]);
  const [fetchingBadgeIndex, setFetchingBadgeIndex] = useState(-1);

  useEffect(() => {
    const reportsList = reports.data;
    //console.log(reportsList);
    //const lastRow = reportsList[reportsList.length - 1]
    if (reportsList && reports.schema) {
      const lastRow = reportsList[reportsList.length - 1];
      const fields = reports.schema.fields.map((field) => field.name);

      const totals = fields.map((field, index) => {
        if (!index) return "Grand total weight";
        return lastRow[field] ? lastRow[field] : "-";
      });

      setTotal(totals);

      const column = fields.map((key) => {
        return {
          Header: key.toUpperCase().replaceAll("_", " "),
          accessor: key,
          Cell: ({ cell }) => {
            return <>{cell.value}</>;
          },
        };
      });
      setColum(column);
    }
  }, [reports]);

  function Filter() {
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

                  fetchReports();
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
  }

  if (isLoading && !reports.data) {
    return (
      <Dashboard>
        <LoadingBlock />
      </Dashboard>
    );
  }

  if (!reports.data && reports.data !== false) {
    return (
      <Dashboard>
        {filters && filters.length && (
          <div className="py-4 px-6 flex bg-white left-0 right-0 z-10 ">
            <Filter />
          </div>
        )}
        <EmptyState />
      </Dashboard>
    );
  }

  const addOneToIndex = (dataForTable) => {
    const dataWithEditedIndex = dataForTable.map((dataItem) => {
      return { ...dataItem, index: dataItem.index + 1 };
    });
    return dataWithEditedIndex;
  };

  return (
    <>
      <Dashboard>
        <Table
          isLoading={isLoading}
          filter={<Filter />}
          columnsDatas={column}
          datas={reports && reports.data ? addOneToIndex(reports.data) : []}
          totals={totals}
        />
      </Dashboard>
    </>
  );
};

export default Home;
