import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import IntentPage from "./pages/IntentPage";
import SearchPage from "./pages/SearchPage";
import ToolPage from "./pages/ToolPage";
import CanonicalPage from "./pages/CanonicalPage";
import TrustPage from "./pages/TrustPage";
import NotFound from "./pages/NotFound";
import "./index.css";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/search" component={SearchPage} />
    <Route path="/tool/:slug" component={ToolPage} />
    <Route path="/fix/:slug" component={CanonicalPage} />
    <Route path="/calculate/:slug" component={CanonicalPage} />
    <Route path="/decide/:slug" component={CanonicalPage} />
    <Route path="/when/:slug" component={CanonicalPage} />
    <Route path="/cost/:slug" component={CanonicalPage} />
    <Route path="/about" component={TrustPage} />
    <Route path="/how-vorqena-works" component={TrustPage} />
    <Route path="/editorial-policy" component={TrustPage} />
    <Route path="/sources" component={TrustPage} />
    <Route path="/contact" component={TrustPage} />
    <Route path="/privacy" component={TrustPage} />
    <Route path="/terms" component={TrustPage} />
    <Route path="/fix" component={() => <IntentPage type="fix" />} />
    <Route path="/calculate" component={() => <IntentPage type="calculate" />} />
    <Route path="/decide" component={() => <IntentPage type="decide" />} />
    <Route path="/when" component={() => <IntentPage type="when" />} />
    <Route path="/cost" component={() => <IntentPage type="cost" />} />
    <Route component={NotFound} />
  </Switch>;
}
