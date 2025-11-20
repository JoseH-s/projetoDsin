import { parse, isValid } from "date-fns";

export function processDate(dateString) {
  if (!dateString) return null;

  const formats = ["dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy HH:mm", "dd/MM/yyyy"];

  for (const format of formats) {
    const parsed = parse(dateString, format, new Date());
    if (isValid(parsed)) return parsed.toISOString();
  }

  return null;
}