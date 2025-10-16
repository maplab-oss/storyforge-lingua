import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
}

interface Props {
  issues: Issue[];
}

export default function LanguageIssues({ issues }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues</CardTitle>
        <CardDescription>Known issues for this language</CardDescription>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <EmptyState
            icon={CheckCircle}
            title="No issues reported"
            description="This language doesn't have any known issues at the moment."
          />
        ) : (
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="border-l-2 border-primary pl-4 py-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-foreground">{issue.title}</p>
                  <Badge
                    variant={
                      issue.status === "open" ? "destructive" : "secondary"
                    }
                  >
                    {issue.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
