// Format of the data to be Returned by use Date Hook
type DateObjectFormat = {
  month: string;
  day: string;
  dateValue: number;
  year: number;
};
// Use date Hook Made which returns the Updated date
const useDate = (): DateObjectFormat => {
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

  let date: Date = new Date();
  let month: string = Months[date.getMonth()];
  let day: string = Weekdays[date.getDay()];
  let year: number = date.getFullYear();
  let dateValue: number = date.getDate();
  let dateObject = {
    month,
    day,
    year,
    dateValue,
  };

  return dateObject;
};

export default useDate;
