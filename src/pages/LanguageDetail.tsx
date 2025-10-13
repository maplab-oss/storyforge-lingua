import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { languages } from "@/lib/mockData";
import Stories from "./Stories";
import Characters from "./Characters";
import Words from "./Words";

export default function LanguageDetail() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  const language = languages.find(lang => lang.code === languageId);

  if (!language) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Language Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{language.name}</h1>
          <p className="text-muted-foreground mt-1">Manage content for {language.name}</p>
        </div>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="mt-6">
          <Stories selectedLanguage={languageId || 'all'} />
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <Characters selectedLanguage={languageId || 'all'} />
        </TabsContent>

        <TabsContent value="words" className="mt-6">
          <Words selectedLanguage={languageId || 'all'} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
