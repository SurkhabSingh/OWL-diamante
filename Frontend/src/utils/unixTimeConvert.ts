export default function timeConverter(UNIX_timestamp: number): string {
  const a = new Date(UNIX_timestamp * 1000);
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year: number = a.getFullYear();
  const month: string = months[a.getMonth()];
  const date: number = a.getDate();

  const time: string = date + " " + month + " " + year;
  return time;
}
