import { users } from "../domain/data";

export function readSession() {
  try {
    return (
      users.find((u) => u.id === sessionStorage.getItem("voltia-user")) ?? null
    );
  } catch {
    return null;
  }
}
export function readAlertStates(): Record<string, string> {
  try {
    const value = JSON.parse(localStorage.getItem("voltia-alerts") || "{}");
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch {
    return {};
  }
}
