import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLangById } from "@/lib/getLangById";
import { SysLang } from "@maplab-oss/static-config";

interface Props {
  language: SysLang;
}

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField = (props: InfoFieldProps) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{props.label}</p>
    <p className="text-lg font-semibold uppercase">{props.value}</p>
  </div>
);

export default function LanguageInfo({ language }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Name" value={language.name} />
          <InfoField label="ID" value={language.id} />
          <InfoField label="Emoji" value={language.emoji} />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant="secondary">Active</Badge>
          </div>
          <InfoField label="Writing system" value={language.writingSystem} />
          <div className="md:col-span-2 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Source Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {language.forLangIds.map((id) => (
                <Badge key={id} variant="outline">
                  {getLangById(id).name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Countries
            </p>
            <div className="flex flex-wrap gap-2">
              {language.countries.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
