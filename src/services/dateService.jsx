import { parse, isValid } from "date-fns";

export function processDate(dateString) {
  if (!dateString) return null;

  // Remove " às " if present
  const cleanedDate = dateString.replace(' às ', ' ');

  const formats = [
    "dd/MM/yy HH:mm:s",    // 12/11/21 18:21:5
    "dd/MM/yyyy HH:mm:ss",
    "dd/MM/yyyy HH:mm",
    "dd/MM/yyyy",
    "dd/MM/yy HH:mm:ss",
    "dd/MM/yy"
  ];

  for (const format of formats) {
    const parsed = parse(cleanedDate, format, new Date());
    if (isValid(parsed)) {
      // Return ISO format without milliseconds as backend expects
      return parsed.toISOString().split('.')[0];
    }
  }

  // If it's already an ISO string, remove milliseconds
  if (dateString.includes('T')) {
    return dateString.split('.')[0].replace('Z', '');
  }

  return null;
}

export function isToday(date) {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function formatDisplayDate(isoString, locale = "pt-BR") {
  if (!isoString) return "-";

  const date = new Date(isoString);

  if (!isValid(date)) return "";

  return date.toLocaleDateString(locale);
}