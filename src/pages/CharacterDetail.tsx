import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  const [avatar, setAvatar] = useState(character?.avatar || '');
  const [status, setStatus] = useState(character?.status || 'active');
  
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = status === 'active' ? 'archived' : 'active';
    setStatus(newStatus);
    toast({
      title: status === 'active' ? "Character archived" : "Character restored",
      description: `Character has been ${status === 'active' ? 'moved to archive' : 'restored to active'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleToggleStatus}
            className="gap-2"
          >
            {status === 'active' ? (
              <>
                <Archive className="h-4 w-4" />
                Archive
              </>
            ) : (
              <>
                <ArchiveRestore className="h-4 w-4" />
                Restore
              </>
            )}
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Character Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
              </div>
            </div>

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
                <Label>Status</Label>
                <div className="flex items-center h-10 px-3 rounded-md border bg-muted">
                  <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                    {status}
                  </Badge>
                </div>
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
