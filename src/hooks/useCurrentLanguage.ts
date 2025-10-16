import { sysLangs } from "@maplab-oss/static-config";
import { useParams } from "react-router-dom";

export const useCurrentLanguageId = () => {
  const { languageId } = useParams();
  return languageId || null;
};

export const useCurrentLanguage = () => {
  const languageId = useCurrentLanguageId();
  if (!languageId) return null;
  return sysLangs.find((lang) => lang.id === languageId) || null;
};
