import { useState } from "react";

export default function useDate(){
  const [date, setDate] = useState(new Date());

  function onSelectDate(date) {
    setDate(new Date(date))
  }

  return {
    date,
    onSelectDate
  }
}
