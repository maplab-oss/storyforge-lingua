import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import Characters from "./pages/Characters";
import Words from "./pages/Words";
import LanguageDetail from "./pages/LanguageDetail";
import StoryDetail from "./pages/StoryDetail";
import WordDetail from "./pages/WordDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/languages/:languageId" element={<LanguageDetail />} />
              <Route path="/languages/:languageId/stories/:storyId" element={<StoryDetail />} />
              <Route path="/languages/:languageId/words/:wordId" element={<WordDetail />} />
              <Route path="/stories" element={<Stories selectedLanguage={selectedLanguage} />} />
              <Route path="/characters" element={<Characters selectedLanguage={selectedLanguage} />} />
              <Route path="/words" element={<Words selectedLanguage={selectedLanguage} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
