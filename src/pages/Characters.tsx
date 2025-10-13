import { useState } from "react";
import { Plus, Lightbulb, Image, Archive, ArchiveRestore } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { characters, characterIdeas, languages } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

export default function Characters() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const [selectedIdeaForConversion, setSelectedIdeaForConversion] = useState<string | null>(null);

  // Redirect if no language is selected
  if (!languageId) {
    return <Navigate to="/" replace />;
  }

  // Validate language exists
  const currentLanguage = languages.find(l => l.code === languageId);
  if (!currentLanguage) {
    return <Navigate to="/" replace />;
  }
  
  const allCharacters = characters.filter(c => c.language === languageId);
  const activeCharacters = characters.filter(c => c.language === languageId && c.status === 'active');
  const archivedCharacters = characters.filter(c => c.language === languageId && c.status === 'archived');
  const filteredIdeas = characterIdeas.filter(i => i.language === languageId);

  const handleGenerateIdeas = () => {
    toast({
      title: "Generating ideas",
      description: "AI is generating new character ideas...",
    });
  };

  const handleArchiveCharacter = (characterId: string, characterName: string) => {
    toast({
      title: "Character archived",
      description: `${characterName} has been archived`,
    });
  };

  const handleUnarchiveCharacter = (characterId: string, characterName: string) => {
    toast({
      title: "Character restored",
      description: `${characterName} has been restored to active`,
    });
  };

  const handleGenerateImage = (ideaId: string) => {
    toast({
      title: "Generating image",
      description: "AI is creating a character image...",
    });
  };

  const handleConvertToCharacter = () => {
    if (!selectedIdeaForConversion) return;
    toast({
      title: "Converting to character",
      description: "Creating a new character from this idea...",
    });
    setSelectedIdeaForConversion(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Characters</h1>
          <p className="text-muted-foreground mt-2">Manage story characters and personas</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Character
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allCharacters.map((character) => (
            <Card key={character.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div 
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                    onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={character.avatar} alt={character.name} />
                      <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <span className="uppercase text-xs font-semibold">{character.language}</span>
                        <Badge variant={character.status === 'active' ? 'default' : 'secondary'}>
                          {character.status}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  {character.status === 'active' ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArchiveCharacter(character.id, character.name);
                      }}
                      title="Archive character"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnarchiveCharacter(character.id, character.name);
                      }}
                      title="Restore character"
                    >
                      <ArchiveRestore className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCharacters.map((character) => (
            <Card key={character.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div 
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                    onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={character.avatar} alt={character.name} />
                      <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <span className="uppercase text-xs font-semibold">{character.language}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchiveCharacter(character.id, character.name);
                    }}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="archived" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {archivedCharacters.length > 0 ? (
            archivedCharacters.map((character) => (
              <Card key={character.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                      onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={character.avatar} alt={character.name} />
                        <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{character.name}</CardTitle>
                        <CardDescription className="mt-1">
                          <span className="uppercase text-xs font-semibold">{character.language}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnarchiveCharacter(character.id, character.name);
                      }}
                      title="Restore character"
                    >
                      <ArchiveRestore className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8 col-span-full">No archived characters</p>
          )}
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="gap-2" onClick={handleGenerateIdeas}>
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
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateImage(idea.id)}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Generate Image
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedIdeaForConversion(idea.id)}
                    >
                      Create Character
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Convert Idea to Character Dialog */}
      <Dialog open={!!selectedIdeaForConversion} onOpenChange={(open) => !open && setSelectedIdeaForConversion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Character</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This will create a new character from the selected idea. You can customize it further after creation.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedIdeaForConversion(null)}>
              Cancel
            </Button>
            <Button onClick={handleConvertToCharacter}>Create Character</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
