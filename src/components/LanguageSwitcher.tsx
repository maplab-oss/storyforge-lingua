import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/lib/mockData";

interface LanguageSwitcherProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
}

export const LanguageSwitcher = ({ selectedLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  const current = languages.find(l => l.code === selectedLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {current?.name || 'All Languages'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange('all')}>
          {selectedLanguage === 'all' && <Check className="mr-2 h-4 w-4" />}
          <span className={selectedLanguage !== 'all' ? 'ml-6' : ''}>All Languages</span>
        </DropdownMenuItem>
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.id} onClick={() => onLanguageChange(lang.code)}>
            {selectedLanguage === lang.code && <Check className="mr-2 h-4 w-4" />}
            <span className={selectedLanguage !== lang.code ? 'ml-6' : ''}>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
