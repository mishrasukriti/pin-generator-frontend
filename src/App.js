import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/style.css";

//ROUTES
import LandingPage from "./components/LandingPage";

// Login, Register ROUTES
import Login from "./components/Login";
import Register from "./components/Register";


import ChangePassword from "./components/ChangePassword";
import DashboardMain from './components/dashboard/dash';

import PasswordReset from "./components/PasswordReset";

import ActivateAccount from "./components/ActivateAccount"
import WelcomeScreen from "./components/WelcomeScreen"

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>

          <Route path="/welcomeScreen"  component={WelcomeScreen} />

          <Route path="/dashboardMain"  component={DashboardMain} />

          <Route path="/" exact component={() => <LandingPage />} />
         
          <Route
            path="/login"
            exact
            component={() => <Login />}
          />
          <Route
            path="/register"
            exact
            component={() => <Register />}
          />
          <Route path="/changepassword" exact component={() => <ChangePassword />} />
          
          <Route path="/passwordreset" exact component={() => <PasswordReset />} />
          <Route path="/activateAccount" exact component={() => <ActivateAccount />} />
         
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
