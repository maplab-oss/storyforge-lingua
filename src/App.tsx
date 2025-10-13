import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import Characters from "./pages/Characters";
import Words from "./pages/Words";
import ManageLanguages from "./pages/ManageLanguages";
import LanguageDetail from "./pages/LanguageDetail";
import StoryDetail from "./pages/StoryDetail";
import WordDetail from "./pages/WordDetail";
import CharacterDetail from "./pages/CharacterDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
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
                    <AppLayout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/manage-languages" element={<ManageLanguages />} />
                        <Route path="/languages/:languageId" element={<LanguageDetail />} />
                        <Route path="/languages/:languageId/stories" element={<Stories />} />
                        <Route path="/languages/:languageId/stories/:storyId" element={<StoryDetail />} />
                        <Route path="/languages/:languageId/characters" element={<Characters />} />
                        <Route path="/languages/:languageId/characters/:characterId" element={<CharacterDetail />} />
                        <Route path="/languages/:languageId/words" element={<Words />} />
                        <Route path="/languages/:languageId/words/:wordId" element={<WordDetail />} />
                        
                        {/* Redirect old routes to home */}
                        <Route path="/stories" element={<Navigate to="/" replace />} />
                        <Route path="/characters" element={<Navigate to="/" replace />} />
                        <Route path="/words" element={<Navigate to="/" replace />} />
                        
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
