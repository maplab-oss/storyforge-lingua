import { useState } from "react";
import { Upload, Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { words } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WordsProps {
  selectedLanguage: string;
}

export default function Words({ selectedLanguage }: WordsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredWords = (selectedLanguage === 'all' 
    ? words 
    : words.filter(w => w.language === selectedLanguage))
    .filter(w => 
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Words</h1>
          <p className="text-muted-foreground mt-2">Manage vocabulary database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
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
          <Dialog key={word.id}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-4 gap-4">
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
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">{word.word}</DialogTitle>
                <DialogDescription className="uppercase text-xs">{word.language}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Translation</p>
                    <p className="text-lg">{word.translation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Transliteration</p>
                    <p className="text-lg">{word.transliteration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Part of Speech</p>
                    <Badge variant="secondary">{word.partOfSpeech}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Rank</p>
                    <p>{word.rank}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Tags</p>
                  <div className="flex gap-2">
                    {word.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{word.notes}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Data Sources</p>
                  <div className="flex gap-2">
                    {word.dataSources.map(source => (
                      <Badge key={source} variant="outline">{source}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
