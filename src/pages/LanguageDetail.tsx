import LanguageInfo from "@/components/LanguageInfo";
import LanguageIssues from "@/components/LanguageIssues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";
import { languageIssues } from "@/lib/mockData";
import { useParams } from "react-router-dom";
import Characters from "./Characters";
import Stories from "./Stories";
import Words from "./Words";

export default function LanguageDetail() {
  const { languageId } = useParams();
  const language = useCurrentLanguage();

  const issues =
    languageIssues[languageId as keyof typeof languageIssues] || [];

  if (!language) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          Language Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <LanguageInfo language={language} />
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <LanguageIssues issues={issues} />
        </TabsContent>

        <TabsContent value="stories" className="mt-6">
          <Stories selectedLanguage={languageId} />
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <Characters selectedLanguage={languageId} />
        </TabsContent>

        <TabsContent value="words" className="mt-6">
          <Words selectedLanguage={languageId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
