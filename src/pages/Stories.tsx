import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lolliBaseUrl } from "@/lib/config";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import z, { ZodSchema } from "zod";

interface StoriesProps {
  selectedLanguage: string;
}

const getQueryOptions = <S extends ZodSchema>(path: string, schema: S) => {
  return {
    queryKey: [path, "th"],
    queryFn: async () => {
      const response = await fetch(`${lolliBaseUrl}${path}?langId=th`, {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      const json = await response.json();
      return schema.parse(json) as z.infer<typeof schema>;
    },
  };
};

const storySchema = z.object({
  id: z.string(),
  title: z.string(),
  deleted: z.boolean(),
});

const storiesSchema = storySchema.array();

export default function Stories({ selectedLanguage }: StoriesProps) {
  const navigate = useNavigate();

  const { data } = useQuery(
    getQueryOptions("/admin/get-stories", storiesSchema),
  );

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stories</h1>
          <p className="text-muted-foreground mt-2">
            Manage your language learning stories
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Story
        </Button>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          {data
            .filter((s) => !s.deleted)
            .map((story) => (
              <Card
                key={story.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  navigate(`/languages/${selectedLanguage}/stories/${story.id}`)
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{story.title}</CardTitle>
                      {/* <CardDescription className="mt-2 flex items-center gap-4">
                        <span className="uppercase text-xs font-semibold">
                          {story.language}
                        </span>
                        <span>Voice: {story.voice}</span>
                        <span>{story.words} words</span>
                      </CardDescription> */}
                    </div>
                    <Badge variant="default">Published</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {data
            .filter((s) => !s.deleted)
            .map((story) => (
              <Card
                key={story.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  navigate(`/languages/${selectedLanguage}/stories/${story.id}`)
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{story.title}</CardTitle>
                      {/* <CardDescription className="mt-2 flex items-center gap-4">
                        <span className="uppercase text-xs font-semibold">
                          {story.language}
                        </span>
                        <span>Voice: {story.voice}</span>
                        <span>{story.words} words</span>
                      </CardDescription> */}
                    </div>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Generate Ideas
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
