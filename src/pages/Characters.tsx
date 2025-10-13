import { Plus, Lightbulb } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { characters, characterIdeas, languages } from "@/lib/mockData";

export default function Characters() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();

  // Redirect if no language is selected
  if (!languageId) {
    return <Navigate to="/" replace />;
  }

  // Validate language exists
  const currentLanguage = languages.find(l => l.code === languageId);
  if (!currentLanguage) {
    return <Navigate to="/" replace />;
  }
  
  const activeCharacters = characters.filter(c => c.language === languageId && c.status === 'active');
  const archivedCharacters = characters.filter(c => c.language === languageId && c.status === 'archived');
  const filteredIdeas = characterIdeas.filter(i => i.language === languageId);

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

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCharacters.map((character) => (
            <Card 
              key={character.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
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
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="archived" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {archivedCharacters.length > 0 ? (
            archivedCharacters.map((character) => (
              <Card 
                key={character.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
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
                </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8 col-span-full">No archived characters</p>
          )}
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
                  <Button size="sm">Create Character</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
