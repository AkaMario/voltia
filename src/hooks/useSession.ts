import { useState } from "react";
import { readSession } from "../utils/storage";
import type { User } from "../domain/data";
export function useSession() {
  const [user, setUser] = useState<User | null>(readSession);
  function login(next: User) {
    sessionStorage.setItem("voltia-user", next.id);
    setUser(next);
  }
  function logout() {
    sessionStorage.removeItem("voltia-user");
    setUser(null);
  }
  return { user, login, logout };
}
