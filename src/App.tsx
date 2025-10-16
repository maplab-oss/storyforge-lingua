import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Auth from "./pages/Auth";
import CharacterDetail from "./pages/CharacterDetail";
import Index from "./pages/Index";
import LanguageDetail from "./pages/LanguageDetail";
import NotFound from "./pages/NotFound";
import StoryDetail from "./pages/StoryDetail";
import WordDetail from "./pages/WordDetail";

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
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <AppLayout>
                            <Index />
                          </AppLayout>
                        }
                      />
                      <Route
                        path="/languages/:languageId"
                        element={
                          <AppLayout>
                            <LanguageDetail />
                          </AppLayout>
                        }
                      />
                      <Route
                        path="/languages/:languageId/stories/:storyId"
                        element={
                          <AppLayout>
                            <StoryDetail />
                          </AppLayout>
                        }
                      />
                      <Route
                        path="/languages/:languageId/words/:wordId"
                        element={
                          <AppLayout>
                            <WordDetail />
                          </AppLayout>
                        }
                      />
                      <Route
                        path="/languages/:languageId/characters/:characterId"
                        element={
                          <AppLayout>
                            <CharacterDetail />
                          </AppLayout>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <AppLayout>
                            <NotFound />
                          </AppLayout>
                        }
                      />
                    </Routes>
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
