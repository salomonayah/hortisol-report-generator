import { useQuery } from "react-query";
import { getStateListWithFilter } from "../api";
import { useAppContext } from "../state";
import useIsMounted from './useIsMounted';

export default function useFetchFilters() {
  const { currentState, setFilterType, setFilters  } = useAppContext();
  const isMounted = useIsMounted()
  const { isLoading, error, data, refetch } = useQuery(
    ["filters"],
    async () => {

      let updatedState = currentState
      const localStorageState = localStorage.getItem('state')

      if(isMounted() && localStorageState){
        updatedState = JSON.parse(localStorageState)
      }


      return getStateListWithFilter(updatedState.id);
    },
    {
      enabled: !!currentState,
      onSuccess: (data) => {
        setFilters(data)
        if (data.length) {
          //IF CURRENT FILTER IS EMPTY JUST TAKE THE FIRST FILTER AVAILABE
          setFilterType(data[0].filterType.id);
        }
      },
    }
  );

  return {
    isLoading,
    error,
    data: data || [],
    fetchFilters: refetch
  };
}
