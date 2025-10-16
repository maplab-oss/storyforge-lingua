import { sysLangs } from "@maplab-oss/static-config";

export const getLangById = (id: string) => {
  const lang = sysLangs.find((l) => l.id === id);
  if (!lang) throw new Error(`language not found for id ${id}`);
  return lang;
};
