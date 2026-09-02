import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import IntentPage from "./pages/IntentPage";
import SearchPage from "./pages/SearchPage";
import ToolPage from "./pages/ToolPage";
import NotFound from "./pages/NotFound";
import "./index.css";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/search" component={SearchPage} />
    <Route path="/tool/:slug" component={ToolPage} />
    <Route path="/fix" component={() => <IntentPage type="fix" />} />
    <Route path="/calculate" component={() => <IntentPage type="calculate" />} />
    <Route path="/decide" component={() => <IntentPage type="decide" />} />
    <Route path="/when" component={() => <IntentPage type="when" />} />
    <Route path="/cost" component={() => <IntentPage type="cost" />} />
    <Route component={NotFound} />
  </Switch>;
}
