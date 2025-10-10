import { useState } from "react";
import { Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stories, storyIdeas, voices } from "@/lib/mockData";

interface StoriesProps {
  selectedLanguage: string;
}

export default function Stories({ selectedLanguage }: StoriesProps) {
  const filteredStories = selectedLanguage === 'all' 
    ? stories 
    : stories.filter(s => s.language === selectedLanguage);

  const filteredIdeas = selectedLanguage === 'all'
    ? storyIdeas
    : storyIdeas.filter(i => i.language === selectedLanguage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stories</h1>
          <p className="text-muted-foreground mt-2">Manage your language learning stories</p>
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
          {filteredStories.filter(s => s.status === 'published').map((story) => (
            <Card key={story.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-4">
                      <span className="uppercase text-xs font-semibold">{story.language}</span>
                      <span>Voice: {story.voice}</span>
                      <span>{story.words} words</span>
                    </CardDescription>
                  </div>
                  <Badge variant="default">Published</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {filteredStories.filter(s => s.status === 'draft').map((story) => (
            <Card key={story.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-4">
                      <span className="uppercase text-xs font-semibold">{story.language}</span>
                      <span>Voice: {story.voice}</span>
                      <span>{story.words} words</span>
                    </CardDescription>
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
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{idea.idea}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase">{idea.language}</p>
                  </div>
                  <Button size="sm">Convert to Story</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
