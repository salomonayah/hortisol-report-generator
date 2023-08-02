import { useQuery } from 'react-query';

import { getReportList, getStateListWithFilter } from '../api';
import { useAppContext } from '../state';
import { useState } from 'react';


export default function useFetchReport() {
  const {
    startDate,
    endDate,
    currentState: state,
    setReports,
    filterType,
    setFilters,
    setFilterType,
    sortType,
    sortField,
  } = useAppContext();

  const [countRender, setCountRender] = useState(0);

  const { isLoading, data, refetch, isError } = useQuery(
    ["reports", sortType, sortField],
    async () => {
      let updatedState = state
      const localStorageState = localStorage.getItem('state')
      const localStorageStartDate = localStorage.getItem('startDate')
      const localStorageEndDate = localStorage.getItem('endDate')
      
      function getSortType() {
        const sortFromLocale = localStorage.getItem('sortType')
        if(countRender === 0 && sortFromLocale){
          return sortFromLocale
        }
        return sortType || ''
      }
      function getSortField() { 
        const sortFieldFromLocale = localStorage.getItem('sortField')
        if(countRender === 0 && sortFieldFromLocale){
          return sortFieldFromLocale
        }
        return sortField || ''
      }

      if (localStorageState) {
        updatedState = JSON.parse(localStorageState)
      }
      setCountRender(countRender + 1)

      return getReportList({
        startDate: localStorageStartDate || startDate,
        endDate: localStorageEndDate || endDate,
        state: updatedState,
        filterType,
        sortType: getSortType(),
        sortField: getSortField(),
      });
    },
    {
      enabled: !!filterType && !!state,
      onSuccess: (data) => {
        setReports(data);
      },
      onError: () => {
        setReports({ error: true });
      }
    }
  );

  const {
    isFetching: isLoadingGroup,
    refetch: refetchGroup,
    data: dataGroup,
    isError: isErrorGroup
  } = useQuery(
    ["reports-group"],
    async () => {
      await new Promise((r) => setTimeout(r, 2000));
      const filters = await getStateListWithFilter(state.id);
      await setFilters(filters);
      await setFilterType(filters[0].filterType.id);
      return getReportList({
        startDate,
        endDate,
        state,
        filterType: filters[0].filterType.id,
        sortType: sortType || "",
        sortField: sortField || "",
      });
    },
    {
      cacheTime: 0,
      enabled: false,
      onSuccess: (data) => {
        setReports(data);
      },
      onError: () => {
        setReports({ error: true });
      }
    }
  );

  return {
    isLoading: isLoading || isLoadingGroup,
    isError: isErrorGroup || isError,
    data: data || dataGroup || [],
    fetchReports: refetch,
    refetchGroup,
    isLoadingGroup,
  };
}
