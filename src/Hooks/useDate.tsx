import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

// Format of the data to be Returned by use Date Hook
type dateObjectFormat = {
  month: string;
  day: string;
  dateValue: number;
  year: number;
};
// Use date Hook Made which returns the Updated date
const useDate = (): dateObjectFormat => {
  const [dateObject, setDate] = useState<dateObjectFormat>({
    month: "",
    day: "",
    year: 0,
    dateValue: 0,
  });
  const [date, setdate] = useState(new Date().getSeconds());
  const Weekdays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  const Months: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];
  useEffect(() => {
    let timer: number = setInterval(() => {
      let date: Date = new Date();
      let month: string = Months[date.getMonth()];
      let day: string = Weekdays[date.getDay()];
      let year: number = date.getFullYear();
      let dateValue: number = date.getDate();
      setDate({ month, day, year, dateValue });
    }, 1);
    return () => clearInterval(timer);
  });

  return dateObject;
};

export default useDate;
