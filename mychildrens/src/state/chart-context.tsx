import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { initialState, reduceChart, type Action } from "./reducer";
import type { ChartState } from "../domain/types";

const ChartContext = createContext<{ state: ChartState; dispatch: Dispatch<Action> } | null>(null);

export function ChartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduceChart, initialState);
  return <ChartContext.Provider value={{ state, dispatch }}>{children}</ChartContext.Provider>;
}

export function useChart() {
  const value = useContext(ChartContext);
  if (!value) throw new Error("useChart must be used within ChartProvider");
  return value;
}
