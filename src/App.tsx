import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import IndustryOverview from "./pages/IndustryOverview";
import DesignGuide from "./pages/DesignGuide";
import UIGuide from "./pages/UIGuide";
import UXGuide from "./pages/UXGuide";
import PageTemplates from "./pages/PageTemplates";
import ContentGuide from "./pages/ContentGuide";
import ProofSystem from "./pages/ProofSystem";
import SeoGeo from "./pages/SeoGeo";
import Checklist from "./pages/Checklist";
import ClientBrief from "./pages/ClientBrief";
import SiteBlueprint from "./pages/SiteBlueprint";
import ImplementationRules from "./pages/ImplementationRules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/industry-overview" element={<IndustryOverview />} />
            <Route path="/design-guide" element={<DesignGuide />} />
            <Route path="/ui-guide" element={<UIGuide />} />
            <Route path="/ux-guide" element={<UXGuide />} />
            <Route path="/page-templates" element={<PageTemplates />} />
            <Route path="/content-guide" element={<ContentGuide />} />
            <Route path="/proof-system" element={<ProofSystem />} />
            <Route path="/seo-geo" element={<SeoGeo />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/client-brief" element={<ClientBrief />} />
            <Route path="/site-blueprint" element={<SiteBlueprint />} />
            <Route path="/implementation-rules" element={<ImplementationRules />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
