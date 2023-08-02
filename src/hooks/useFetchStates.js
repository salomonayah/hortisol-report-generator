import { useQuery } from "react-query"
import { getStateList } from "../api/index"

export default function useFetchStates() {
  const { isLoading, error, data, refetch } = useQuery('state-list', async () => {
    return getStateList()
  })

  return {
    isLoading,
    error,
    data,
    fetchStates: refetch
  }
}