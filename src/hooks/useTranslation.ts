import React, { useCallback, useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
import i18n from "../services/translation";

const useTranslation = () => {
  const language = useAppSelector((state) => state.auth.language);

  const t = useCallback(
    (key: string) => {
      return i18n.t(key);
    },
    [language]
  );

  return t;
};

export default useTranslation;
