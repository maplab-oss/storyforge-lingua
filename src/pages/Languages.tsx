import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "@/lib/mockData";

export default function Languages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Languages</h1>
        <p className="text-muted-foreground mt-2">Manage all supported languages and their content</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {languages.map((lang) => (
          <Card key={lang.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{lang.name}</CardTitle>
                  <CardDescription className="uppercase text-xs mt-1">{lang.code}</CardDescription>
                </div>
                <Badge variant={lang.status === 'active' ? 'default' : 'secondary'}>
                  {lang.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stories:</span>
                  <span className="font-medium">{lang.stories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Characters:</span>
                  <span className="font-medium">{lang.characters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Words:</span>
                  <span className="font-medium">{lang.words}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
