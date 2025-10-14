import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sysLangs, npcsForLanguage } from "@maplab-oss/static-config";
import { useNavigate } from "react-router-dom";

export default function Languages() {
  const navigate = useNavigate();

  const handleLanguageClick = (languageCode: string) => {
    navigate(`/languages/${languageCode}`);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Languages</h1>
        <p className="text-muted-foreground mt-2">Manage all supported languages and their content</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sysLangs.map((lang) => (
          <Card 
            key={lang.id} 
            className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            onClick={() => handleLanguageClick(lang.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{lang.emoji} {lang.name}</CardTitle>
                  <CardDescription className="uppercase text-xs mt-1">{lang.id}</CardDescription>
                </div>
                <Badge>
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {/* <div className="flex justify-between">
                  <span className="text-muted-foreground">Stories:</span>
                  <span className="font-medium">{lang.stories}</span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Characters:</span>
                  <span className="font-medium">{npcsForLanguage(lang.id).length ?? 0}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-muted-foreground">Words:</span>
                  <span className="font-medium">{lang.words}</span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
