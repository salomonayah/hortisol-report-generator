export default function GetValueFromLocalStorage() {
  const keys = ['state', 'startDate', 'sortType', 'sortField', 'filterType', 'endDate']
  let datas = {}

  keys.forEach((key) => {
    const value = localStorage.getItem(key)
    datas[key] = value

    if(key === 'state'){
      datas[key] = JSON.parse(value)
    }
    else {
      datas[key] = value
    }
  })

  return datas
}