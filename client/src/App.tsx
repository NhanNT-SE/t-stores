import NotFoundPage from "components/common/NotFound";
import { PrivateRoute } from "components/common/PrivateRoute";
import AdminLayout from "components/layouts/AdminLayout";
import UserLayout from "components/layouts/UserLayout";
import LoginPage from "features/auth/pages/LoginPage";
import RegisterPage from "features/auth/pages/RegisterPage";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { rootHistory } from "utils";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Router history={rootHistory}>
        <Switch>
          <PrivateRoute path="/" exact component={UserLayout} />
          <PrivateRoute path="/admin" component={AdminLayout} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
