import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { characters } from "@/lib/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CharacterDetail() {
  const { languageId, characterId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const character = characters.find(c => c.id === characterId && c.language === languageId);
  
  const [name, setName] = useState(character?.name || '');
  const [type, setType] = useState(character?.type || '');
  
  if (!character) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p>Character not found</p>
      </div>
    );
  }

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Character details have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Character Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <div className="flex items-center h-10 px-3 rounded-md border bg-muted">
                  <span className="uppercase text-sm font-semibold">{character.language}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input 
                  id="type" 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center h-10 px-3 rounded-md border bg-muted">
                <Badge variant="outline">{character.status}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Stories Featured In</Label>
              <div className="flex items-center h-10 px-3 rounded-md border bg-muted">
                <span className="text-sm">{character.stories} stories</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Created At</Label>
              <div className="flex items-center h-10 px-3 rounded-md border bg-muted">
                <span className="text-sm">{character.createdAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
