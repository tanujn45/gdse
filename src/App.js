import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/product" component={Product} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
