import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Lightbulb, Pencil } from "lucide-react";
import { languages, stories, characters, characterIdeas, words } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function LanguageDetail() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCharacter, setEditingCharacter] = useState<{ id: string; name: string } | null>(null);
  const [characterName, setCharacterName] = useState("");
  
  const language = languages.find(lang => lang.code === languageId);
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

  const handleEditCharacter = (character: { id: string; name: string }) => {
    setEditingCharacter(character);
    setCharacterName(character.name);
  };

  const handleSaveCharacter = () => {
    // In a real app, this would save to a database
    toast({
      title: "Character updated",
      description: `Character name changed to "${characterName}"`,
    });
    setEditingCharacter(null);
  };

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
              <Card 
                key={story.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/languages/${languageId}/stories/${story.id}`)}
              >
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
                  <div className="flex items-start justify-between">
                    <CardTitle>{character.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCharacter({ id: character.id, name: character.name })}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
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
              <Card 
                key={word.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/languages/${languageId}/words/${word.id}`)}
              >
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
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingCharacter} onOpenChange={(open) => !open && setEditingCharacter(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Character Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="characterName">Name</Label>
              <Input
                id="characterName"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCharacter(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCharacter}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
