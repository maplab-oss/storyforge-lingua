import { useState } from "react";
import { Plus, Lightbulb, Image, Mic } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stories, storyIdeas, voices, languages } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

export default function Stories() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const [selectedStoryForVoice, setSelectedStoryForVoice] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedIdeaForConversion, setSelectedIdeaForConversion] = useState<string | null>(null);
  const [conversionVoice, setConversionVoice] = useState("");

  // Redirect if no language is selected
  if (!languageId) {
    return <Navigate to="/" replace />;
  }

  // Validate language exists
  const currentLanguage = languages.find(l => l.code === languageId);
  if (!currentLanguage) {
    return <Navigate to="/" replace />;
  }
  
  const filteredStories = stories.filter(s => s.language === languageId);
  const filteredIdeas = storyIdeas.filter(i => i.language === languageId);
  const availableVoices = voices.filter(v => v.language === languageId);

  const handleGenerateIdeas = () => {
    toast({
      title: "Generating ideas",
      description: "AI is generating new story ideas...",
    });
  };

  const handleGenerateImage = (storyId: string) => {
    toast({
      title: "Generating image",
      description: "AI is creating an image for this story...",
    });
  };

  const handleChangeVoice = () => {
    if (!selectedStoryForVoice || !selectedVoice) return;
    toast({
      title: "Voice updated",
      description: `Story voice changed to ${selectedVoice}`,
    });
    setSelectedStoryForVoice(null);
    setSelectedVoice("");
  };

  const handleConvertToStory = () => {
    if (!selectedIdeaForConversion || !conversionVoice) return;
    toast({
      title: "Converting to story",
      description: "Creating a new story from this idea...",
    });
    setSelectedIdeaForConversion(null);
    setConversionVoice("");
  };

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
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/languages/${story.language}/stories/${story.id}`)}>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-4">
                      <span className="uppercase text-xs font-semibold">{story.language}</span>
                      <span>Voice: {story.voice}</span>
                      <span>{story.words} words</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Published</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateImage(story.id);
                      }}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Generate Image
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStoryForVoice(story.id);
                        setSelectedVoice(story.voice);
                      }}
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Change Voice
                    </Button>
                  </div>
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
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/languages/${story.language}/stories/${story.id}`)}>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-4">
                      <span className="uppercase text-xs font-semibold">{story.language}</span>
                      <span>Voice: {story.voice}</span>
                      <span>{story.words} words</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Draft</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateImage(story.id);
                      }}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Generate Image
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStoryForVoice(story.id);
                        setSelectedVoice(story.voice);
                      }}
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Change Voice
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
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
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedIdeaForConversion(idea.id)}
                  >
                    Convert to Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Change Voice Dialog */}
      <Dialog open={!!selectedStoryForVoice} onOpenChange={(open) => !open && setSelectedStoryForVoice(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Story Voice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Select Voice</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger id="voice">
                  <SelectValue placeholder="Choose a voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.name}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedStoryForVoice(null)}>
              Cancel
            </Button>
            <Button onClick={handleChangeVoice}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert Idea to Story Dialog */}
      <Dialog open={!!selectedIdeaForConversion} onOpenChange={(open) => !open && setSelectedIdeaForConversion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert Idea to Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="conversionVoice">Select Voice</Label>
              <Select value={conversionVoice} onValueChange={setConversionVoice}>
                <SelectTrigger id="conversionVoice">
                  <SelectValue placeholder="Choose a voice for the story" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.name}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedIdeaForConversion(null)}>
              Cancel
            </Button>
            <Button onClick={handleConvertToStory}>Create Story</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
