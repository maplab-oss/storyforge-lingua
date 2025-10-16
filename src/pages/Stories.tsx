import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";
import { useLolliQuery } from "@/hooks/useLolliQuery";
import { storiesSchema } from "@/schemas/story";
import { FileText, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StoriesProps {
  selectedLanguage: string;
}

interface StoriesTabProps {
  selectedLanguage: string;
  status: "IDEA" | "DRAFT" | "PUBLISHED" | "ARCHIVED";
  badgeVariant: "default" | "secondary" | "outline" | "destructive";
  badgeText: string;
  showGenerateButton?: boolean;
}

function StoriesTab({
  selectedLanguage,
  status,
  badgeVariant,
  badgeText,
  showGenerateButton = false,
}: StoriesTabProps) {
  const navigate = useNavigate();
  const lang = useCurrentLanguage();

  const { data } = useLolliQuery("/admin/get-stories", storiesSchema, {
    langId: lang.id,
    status,
  });

  if (!data) return <p>Loading...</p>;

  if (data.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={`No ${badgeText.toLowerCase()} stories`}
        description={`You don't have any ${badgeText.toLowerCase()} stories yet.`}
        action={
          showGenerateButton
            ? {
                label: "Generate Ideas",
                onClick: () => {
                  // TODO: Implement generate ideas functionality
                  console.log("Generate ideas clicked");
                },
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {showGenerateButton && (
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Generate Ideas
          </Button>
        </div>
      )}
      {data.map((story) => (
        <Card
          key={story.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() =>
            navigate(`/languages/${selectedLanguage}/stories/${story.id}`)
          }
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{story.title}</CardTitle>
                <CardDescription className="mt-1 text-sm font-medium">
                  {story.subtitle}
                </CardDescription>
              </div>
              <Badge variant={badgeVariant}>{badgeText}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Overview
                </h4>
                <p className="text-sm text-muted-foreground">
                  {story.contentOverview}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Why Learn This
                </h4>
                <p className="text-sm text-muted-foreground">
                  {story.reasonToLearn}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Content Preview
                </h4>
                <p className="text-sm text-muted-foreground">
                  {story.content.length > 300
                    ? `${story.content.substring(0, 300)}...`
                    : story.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function Stories({ selectedLanguage }: StoriesProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Stories</h1>
      <Tabs defaultValue="published" className="w-full">
        <TabsList>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="ideas">
          <StoriesTab
            selectedLanguage={selectedLanguage}
            status="IDEA"
            badgeVariant="outline"
            badgeText="Idea"
            showGenerateButton={true}
          />
        </TabsContent>
        <TabsContent value="draft">
          <StoriesTab
            selectedLanguage={selectedLanguage}
            status="DRAFT"
            badgeVariant="secondary"
            badgeText="Draft"
          />
        </TabsContent>
        <TabsContent value="published">
          <StoriesTab
            selectedLanguage={selectedLanguage}
            status="PUBLISHED"
            badgeVariant="default"
            badgeText="Published"
          />
        </TabsContent>
        <TabsContent value="archived">
          <StoriesTab
            selectedLanguage={selectedLanguage}
            status="ARCHIVED"
            badgeVariant="destructive"
            badgeText="Archived"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Stories;
