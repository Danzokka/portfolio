"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { usePathname } from "next/navigation";

type BootContextType = { bootDone: boolean; finishBoot: () => void };

const BootContext = createContext<BootContextType | undefined>(undefined);

/** The terminal boot intro plays once per page load, and only when the visit starts on the home page. */
export function BootProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [bootDone, setBootDone] = useState(() => pathname !== "/");
  const finishBoot = useCallback(() => setBootDone(true), []);
  return <BootContext.Provider value={{ bootDone, finishBoot }}>{children}</BootContext.Provider>;
}

export function useBoot() {
  const ctx = useContext(BootContext);
  if (!ctx) throw new Error("useBoot must be used within a BootProvider");
  return ctx;
}
