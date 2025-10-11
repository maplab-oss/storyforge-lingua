import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X } from "lucide-react";
import { words } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function WordDetail() {
  const { languageId, wordId } = useParams();
  const navigate = useNavigate();
  
  const word = words.find(w => w.id === wordId && w.language === languageId);
  
  const [formData, setFormData] = useState({
    word: word?.word || "",
    translation: word?.translation || "",
    transliteration: word?.transliteration || "",
    partOfSpeech: word?.partOfSpeech || "",
    rank: word?.rank || 0,
    notes: word?.notes || "",
    tags: word?.tags || [],
    dataSources: word?.dataSources || [],
  });

  const [newTag, setNewTag] = useState("");
  const [newSource, setNewSource] = useState("");

  if (!word) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(`/languages/${languageId}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Word Not Found</h1>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: "Word saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const addSource = () => {
    if (newSource.trim() && !formData.dataSources.includes(newSource.trim())) {
      setFormData({ ...formData, dataSources: [...formData.dataSources, newSource.trim()] });
      setNewSource("");
    }
  };

  const removeSource = (sourceToRemove: string) => {
    setFormData({ ...formData, dataSources: formData.dataSources.filter(source => source !== sourceToRemove) });
  };

  const partOfSpeechOptions = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(`/languages/${languageId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Word</h1>
          <p className="text-muted-foreground mt-1">Make changes to this word entry</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Word Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="word">Word</Label>
                <Input
                  id="word"
                  value={formData.word}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  placeholder="Enter word"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="translation">Translation</Label>
                <Input
                  id="translation"
                  value={formData.translation}
                  onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                  placeholder="Enter translation"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transliteration">Transliteration</Label>
                <Input
                  id="transliteration"
                  value={formData.transliteration}
                  onChange={(e) => setFormData({ ...formData, transliteration: e.target.value })}
                  placeholder="Enter transliteration (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partOfSpeech">Part of Speech</Label>
                <Select
                  value={formData.partOfSpeech}
                  onValueChange={(value) => setFormData({ ...formData, partOfSpeech: value })}
                >
                  <SelectTrigger id="partOfSpeech">
                    <SelectValue placeholder="Select part of speech" />
                  </SelectTrigger>
                  <SelectContent>
                    {partOfSpeechOptions.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rank">Frequency Rank</Label>
                <Input
                  id="rank"
                  type="number"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) || 0 })}
                  placeholder="Enter frequency rank"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter any additional notes (optional)"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data Sources</Label>
              <div className="flex gap-2">
                <Input
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Add a data source"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSource())}
                />
                <Button type="button" onClick={addSource}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.dataSources.map((source, i) => (
                  <Badge key={i} variant="outline" className="gap-1">
                    {source}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSource(source)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(`/languages/${languageId}`)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
