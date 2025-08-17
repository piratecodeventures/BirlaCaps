import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import InvestorRelations from "@/pages/investor-relations";
import CompanySecretary from "@/pages/company-secretary";
import Grievances from "@/pages/grievances";
import Policies from "@/pages/policies";
import BoardDirectors from "@/pages/board-directors";
import AdminDashboard from "@/pages/admin/dashboard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/investor-relations" component={InvestorRelations} />
          <Route path="/company-secretary" component={CompanySecretary} />
          <Route path="/grievances" component={Grievances} />
          <Route path="/policies" component={Policies} />
          <Route path="/board-directors" component={BoardDirectors} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
