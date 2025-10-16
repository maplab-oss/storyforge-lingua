import { lolliBaseUrl } from "@/lib/config";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import z, { ZodSchema } from "zod";

export const useLolliQuery = <S extends ZodSchema>(
  path: string,
  schema: S,
  params: Record<string, string> = {},
) => {
  const options = {
    queryKey: [path, JSON.stringify(params)],
    queryFn: async () => {
      const queryString = new URLSearchParams(params).toString();
      const session = await supabase.auth.getSession();
      const authToken = session.data.session?.access_token;

      const response = await fetch(`${lolliBaseUrl}${path}?${queryString}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const json = await response.json();

      try {
        return schema.parse(json) as z.infer<typeof schema>;
      } catch (err) {
        console.error(`zod error: ${err}`);
      }
    },
  };

  return useQuery(options);
};
