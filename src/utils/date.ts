import type { Timestamp } from "firebase/firestore";

export function formatFirestoreTimestamp(timestamp: Timestamp): string {
  if (!timestamp) return "";

  const date = timestamp.toDate();

  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return formatter.format(date);
}
