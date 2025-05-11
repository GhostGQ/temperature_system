export const getTargetTemp = (
  n: number | null,
  act: number,
  p: number | null,
  delta: number
): {text: string; isDanger: boolean} => {
  const start = act - (n ?? 0);
  const end = act + (p ?? 0);
  const isDanger = delta < start || delta > end;

  const text =
    start === end ? String(act) : `${Math.ceil(start)} - ${Math.ceil(end)}`;

  return {text, isDanger};
};