import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import IntentPage from "./pages/IntentPage";
import { AgeCalculatorPage, BmiCalculatorPage, MortgageCalculatorPage } from "./pages/CalculatorPages";
import PublicCalculatorPage from "./pages/PublicCalculatorPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fix" component={() => <IntentPage type="fix" />} />
      <Route path="/calculate" component={() => <IntentPage type="calculate" />} />
      <Route path="/decide" component={() => <IntentPage type="decide" />} />
      <Route path="/when" component={() => <IntentPage type="when" />} />
      <Route path="/cost" component={() => <IntentPage type="cost" />} />
      <Route path="/mortgage" component={MortgageCalculatorPage} />
      <Route path="/bmi" component={BmiCalculatorPage} />
      <Route path="/age" component={AgeCalculatorPage} />
      <Route path="/404" component={NotFound} />
      <Route path="/:slug" component={PublicCalculatorPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
