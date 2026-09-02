import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import IntentPage from "./pages/IntentPage";
import NotFound from "./pages/NotFound";
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fix" component={() => <IntentPage type="fix" />} />
      <Route path="/calculate" component={() => <IntentPage type="calculate" />} />
      <Route path="/decide" component={() => <IntentPage type="decide" />} />
      <Route path="/when" component={() => <IntentPage type="when" />} />
      <Route path="/cost" component={() => <IntentPage type="cost" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
