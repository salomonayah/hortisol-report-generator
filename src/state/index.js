import React, { createContext, useContext } from 'react';

const AppContext = createContext({
  user: null,
  sortField: "",
  sortType: 1,
  filters: [],
  reports: [],
  currentState: null,
  filterType: "",
  startDate: "",
  endDate: "",
  setCurrentState: () => null,
  setReports: () => null,
  setFilterType: () => null,
  setStartDate: () => null,
  setEndDate: () => null,
  setFilters: () => null,
  setSortType: () => null,
  setSortField: () => null,
  setUser: () => null
});

export function AppWrapper({ children, ...rest }) {
  let sharedState = {
    ...rest,
  };

  return (
    <AppContext.Provider value={sharedState.state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
