import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings } from "lucide-react";
import { languages, languageFeatures, languageIssues } from "@/lib/mockData";
import { useState } from "react";
import Stories from "./Stories";
import Characters from "./Characters";
import Words from "./Words";

export default function LanguageDetail() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  const language = languages.find(lang => lang.code === languageId);
  const [features, setFeatures] = useState(languageFeatures[languageId as keyof typeof languageFeatures] || {
    audioPlayback: false,
    transliteration: false,
    npcChat: false,
    stories: false,
  });
  const issues = languageIssues[languageId as keyof typeof languageIssues] || [];

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  if (!language) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Language Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{language.name}</h1>
          <p className="text-muted-foreground mt-1">Manage content for {language.name}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Feature Toggles</CardTitle>
            </div>
            <CardDescription>Control which features are available for this language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Audio Playback</p>
                <p className="text-sm text-muted-foreground">Enable audio buttons in stories and words</p>
              </div>
              <Switch checked={features.audioPlayback} onCheckedChange={() => handleFeatureToggle('audioPlayback')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Transliteration</p>
                <p className="text-sm text-muted-foreground">Show phonetic guides for scripts</p>
              </div>
              <Switch checked={features.transliteration} onCheckedChange={() => handleFeatureToggle('transliteration')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">NPC Chat</p>
                <p className="text-sm text-muted-foreground">Enable AI chat assistant</p>
              </div>
              <Switch checked={features.npcChat} onCheckedChange={() => handleFeatureToggle('npcChat')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Stories</p>
                <p className="text-sm text-muted-foreground">Enable story content and navigation</p>
              </div>
              <Switch checked={features.stories} onCheckedChange={() => handleFeatureToggle('stories')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues</CardTitle>
            <CardDescription>Known issues for this language</CardDescription>
          </CardHeader>
          <CardContent>
            {issues.length === 0 ? (
              <p className="text-sm text-muted-foreground">No issues reported</p>
            ) : (
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div key={issue.id} className="border-l-2 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground">{issue.title}</p>
                      <Badge variant={issue.status === 'open' ? 'destructive' : 'secondary'}>
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stories" disabled={!features.stories}>Stories</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="mt-6">
          {features.stories ? (
            <Stories selectedLanguage={languageId || 'all'} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Stories feature is disabled for this language</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <Characters selectedLanguage={languageId || 'all'} />
        </TabsContent>

        <TabsContent value="words" className="mt-6">
          <Words selectedLanguage={languageId || 'all'} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
