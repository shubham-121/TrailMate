export function calculateDaysBetween(fromdDate, toDate) {
  const from = new Date(fromdDate).getTime();
  const to = new Date(toDate).getTime();

  console.log("from and to: ", from, to);

  const daysBetween = (to - from) / (1000 * 60 * 60 * 24);

  console.log("Days btw: ", daysBetween);

  return daysBetween;
}
