import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import Characters from "./pages/Characters";
import Words from "./pages/Words";
import LanguageDetail from "./pages/LanguageDetail";
import StoryDetail from "./pages/StoryDetail";
import WordDetail from "./pages/WordDetail";
import CharacterDetail from "./pages/CharacterDetail";
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
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/languages/:languageId" element={<LanguageDetail />} />
                        <Route path="/languages/:languageId/stories/:storyId" element={<StoryDetail />} />
                        <Route path="/languages/:languageId/words/:wordId" element={<WordDetail />} />
                        <Route path="/languages/:languageId/characters/:characterId" element={<CharacterDetail />} />
                        <Route path="/stories" element={<Stories selectedLanguage={selectedLanguage} />} />
                        <Route path="/characters" element={<Characters selectedLanguage={selectedLanguage} />} />
                        <Route path="/words" element={<Words selectedLanguage={selectedLanguage} />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
