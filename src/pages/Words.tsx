import { useState } from "react";
import { Upload, Archive, Plus, MessageSquare } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { words, languages } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

export default function Words() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if no language is selected
  if (!languageId) {
    return <Navigate to="/" replace />;
  }

  // Validate language exists
  const currentLanguage = languages.find(l => l.code === languageId);
  if (!currentLanguage) {
    return <Navigate to="/" replace />;
  }
  
  const filteredWords = words
    .filter(w => w.language === languageId)
    .filter(w => 
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleArchiveWord = (wordId: string, word: string) => {
    toast({
      title: "Word archived",
      description: `"${word}" has been archived`,
    });
  };

  const handleManageFeedback = (wordId: string, word: string) => {
    toast({
      title: "Manage feedback",
      description: `Opening feedback manager for "${word}"`,
    });
  };

  const handleImportJson = () => {
    toast({
      title: "Import words",
      description: "Opening JSON import dialog...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Words</h1>
          <p className="text-muted-foreground mt-2">Manage vocabulary database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleImportJson}>
            <Upload className="h-4 w-4" />
            Import JSON
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Word
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search words or translations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />

      <div className="space-y-2">
        {filteredWords.map((word) => (
          <Card key={word.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div 
                  className="flex-1 grid grid-cols-4 gap-4 cursor-pointer"
                  onClick={() => navigate(`/languages/${word.language}/words/${word.id}`)}
                >
                  <div>
                    <p className="font-semibold">{word.word}</p>
                    <p className="text-xs text-muted-foreground uppercase">{word.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Translation</p>
                    <p className="font-medium">{word.translation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Part of Speech</p>
                    <Badge variant="secondary">{word.partOfSpeech}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                    <p className="font-medium">{word.rank}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleManageFeedback(word.id, word.word);
                    }}
                    title="Manage feedback"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchiveWord(word.id, word.word);
                    }}
                    title="Archive word"
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
