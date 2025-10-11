import { Plus, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { characters, characterIdeas } from "@/lib/mockData";

interface CharactersProps {
  selectedLanguage: string;
}

export default function Characters({ selectedLanguage }: CharactersProps) {
  const navigate = useNavigate();
  
  const filteredCharacters = selectedLanguage === 'all' 
    ? characters 
    : characters.filter(c => c.language === selectedLanguage);

  const filteredIdeas = selectedLanguage === 'all'
    ? characterIdeas
    : characterIdeas.filter(i => i.language === selectedLanguage);

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
          {filteredCharacters.map((character) => (
            <Card 
              key={character.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/languages/${character.language}/characters/${character.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
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
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline">{character.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stories:</span>
                    <span className="font-medium">{character.stories}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="archived">
          <p className="text-center text-muted-foreground py-8">No archived characters</p>
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
