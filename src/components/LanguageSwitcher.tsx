import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  useCurrentLanguage,
  useCurrentLanguageId,
} from "@/hooks/useCurrentLanguage";
import { sysLangs } from "@maplab-oss/static-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const currentLanguageId = useCurrentLanguageId();
  const currentLanguage = useCurrentLanguage();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleLanguageSelect = (languageId: string) => {
    navigate(`/languages/${languageId}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2 h-10 px-3"
      >
        <span className="text-2xl">{currentLanguage?.emoji || "🌐"}</span>
        <span className="hidden sm:inline">
          {currentLanguage ? currentLanguage.name : "Select Language"}
        </span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search languages..." />
        <CommandList>
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup heading="Languages">
            {sysLangs.map((lang) => (
              <CommandItem
                key={lang.id}
                value={`${lang.name} ${lang.id}`}
                onSelect={() => handleLanguageSelect(lang.id)}
                className="flex items-center gap-3"
              >
                <span className="text-lg">{lang.emoji}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {lang.id}
                  </span>
                </div>
                {currentLanguageId === lang.id && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Current
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
