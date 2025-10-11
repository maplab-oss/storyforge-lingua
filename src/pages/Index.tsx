import Languages from "./Languages";

interface IndexProps {
  onLanguageChange: (languageId: string) => void;
}

export default function Index({ onLanguageChange }: IndexProps) {
  return <Languages onLanguageChange={onLanguageChange} />;
}
