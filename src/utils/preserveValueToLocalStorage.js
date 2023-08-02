import formatDate from "./formatDate"

export default function PreserveValueToLocalStorage({ filterType, startDate, endDate, state, sortType, sortField }) {

  if (state) {
    localStorage.setItem('state', JSON.stringify(state))
  }

  if (startDate) {
    localStorage.setItem('startDate', formatDate(startDate))
  }

  if (endDate) {
    localStorage.setItem('endDate', formatDate(endDate))
  }

  if (sortType) {
    localStorage.setItem('sortType', sortType)
  }

  if (sortField) {
    localStorage.setItem('sortField', sortField)
  }

  if (filterType) {
    localStorage.setItem('filterType', filterType)
  }

  //HOW TO REFACTOR THIS FUNCTION
  /*
  const dataToPreserve = { filterType, startDate, endDate, state, sortType, sortField };

  for (const [key, value] of Object.entries(dataToPreserve)) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  */

}