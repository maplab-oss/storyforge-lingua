import { Plus, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { languages } from "@/lib/mockData";

export default function ManageLanguages() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Languages</h1>
          <p className="text-muted-foreground mt-2">Add, edit, and configure supported languages</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Language
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {languages.map((lang) => (
          <Card key={lang.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{lang.name}</CardTitle>
                  <CardDescription className="uppercase text-xs mt-1">{lang.code}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={lang.status === 'active' ? 'default' : 'secondary'}>
                    {lang.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
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
