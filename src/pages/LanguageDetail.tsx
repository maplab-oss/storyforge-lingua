import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Lightbulb } from "lucide-react";
import { languages, stories, characters, characterIdeas, words } from "@/lib/mockData";
import { useState } from "react";

export default function LanguageDetail() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const language = languages.find(lang => lang.id === languageId);
  const filteredStories = stories.filter(story => story.language === languageId);
  const filteredCharacters = characters.filter(char => char.language === languageId);
  const filteredCharacterIdeas = characterIdeas.filter(idea => idea.language === languageId);
  const filteredWords = words.filter(word => word.language === languageId)
    .filter(word => 
      searchQuery === "" || 
      word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{language.name}</h1>
            <p className="text-muted-foreground mt-1">Manage content for {language.name}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Stories</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Story
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <Badge variant={story.status === 'published' ? 'default' : 'secondary'}>
                      {story.status}
                    </Badge>
                  </div>
                  <CardDescription>{story.voice}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words:</span>
                      <span className="font-medium">{story.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{story.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Characters</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Character
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCharacters.map((character) => (
              <Card key={character.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{character.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="w-fit">{character.type}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stories:</span>
                      <span className="font-medium">{character.stories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={character.status === 'active' ? 'default' : 'secondary'}>
                        {character.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCharacterIdeas.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Character Ideas</h2>
                <Button variant="outline" size="sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Generate Ideas
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCharacterIdeas.map((idea) => (
                  <Card key={idea.id} className="bg-muted/50">
                    <CardHeader>
                      <CardDescription>{idea.idea}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        Create Character
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="words" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Words</h2>
            <div className="flex gap-2">
              <Button variant="outline">Import</Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Word
              </Button>
            </div>
          </div>

          <Input 
            placeholder="Search words..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWords.map((word) => (
              <Dialog key={word.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{word.word}</CardTitle>
                      <CardDescription>{word.translation}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {word.transliteration && (
                          <p className="text-muted-foreground italic">{word.transliteration}</p>
                        )}
                        <Badge variant="outline">{word.partOfSpeech}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{word.word}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Translation</h4>
                      <p>{word.translation}</p>
                    </div>
                    {word.transliteration && (
                      <div>
                        <h4 className="font-semibold mb-1">Transliteration</h4>
                        <p className="italic">{word.transliteration}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-1">Part of Speech</h4>
                      <Badge variant="outline">{word.partOfSpeech}</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Rank</h4>
                      <p>{word.rank}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {word.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    {word.notes && (
                      <div>
                        <h4 className="font-semibold mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{word.notes}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-1">Data Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {word.dataSources.map((source, i) => (
                          <Badge key={i} variant="outline">{source}</Badge>
                        ))}
                      </div>
                    </div>
                    {word.feedback && (
                      <div>
                        <h4 className="font-semibold mb-1">Feedback</h4>
                        <p className="text-sm">{word.feedback}</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
