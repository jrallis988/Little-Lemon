import { translate, type CopyKey } from "./copy";
import { useChart } from "../state/chart-context";
import type { Language } from "../domain/types";

export function useI18n() {
  const { state, dispatch } = useChart();
  return {
    language: state.language,
    t: (key: CopyKey) => translate(state.language, key),
    setLanguage: (language: Language) => dispatch({ type: "set_language", language }),
  };
}
