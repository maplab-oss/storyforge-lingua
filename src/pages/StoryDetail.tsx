import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { stories, voices } from "@/lib/mockData";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function StoryDetail() {
  const { languageId, storyId } = useParams();
  const navigate = useNavigate();

  const story = stories.find(
    (s) => s.id === storyId && s.language === languageId,
  );

  const [formData, setFormData] = useState({
    title: story?.title || "",
    voice: story?.voice || "",
    words: story?.words || 0,
    status: story?.status || "draft",
  });

  if (!story) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/languages/${languageId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Story Not Found
          </h1>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: "Story saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const filteredVoices = voices.filter((v) => v.language === languageId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(`/languages/${languageId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Story</h1>
          <p className="text-muted-foreground mt-1">
            Make changes to your story
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Story Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter story title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Select
                value={formData.voice}
                onValueChange={(value) =>
                  setFormData({ ...formData, voice: value })
                }
              >
                <SelectTrigger id="voice">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {filteredVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.name}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="words">Word Count</Label>
              <Input
                id="words"
                type="number"
                value={formData.words}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    words: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter word count"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "draft" | "published",
                  })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/languages/${languageId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Story Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Created:</span>
            <span className="font-medium">{story.createdAt}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Status:</span>
            <Badge
              variant={story.status === "published" ? "default" : "secondary"}
            >
              {story.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
