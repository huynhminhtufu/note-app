import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "modules/home/Home";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
