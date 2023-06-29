import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// css
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/truecallerjs">Home</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/truecallerjs/login">Login</Link>
              </li>
              <li>
                <Link to="/truecallerjs/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/truecallerjs/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav> */}

      <Switch>
        <Route exact path="/truecallerjs">
          {isLoggedIn ? <Redirect to="/truecallerjs/dashboard" /> : <Home />}
        </Route>
        <Route path="/truecallerjs/login">
          {isLoggedIn ? <Redirect to="/truecallerjs/dashboard" /> : <Home />}
        </Route>
        <Route path="/truecallerjs/signup" component={Signup} />
        <PrivateRoute
          path="/truecallerjs/dashboard"
          component={Dashboard}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <h1 className="title">
        Welcome to{" "}
        <a href="https://sumithemmadi.github.io/truecallerjs">TruecallerJS!</a>
      </h1>

      <p className="description">
        A npm package to retrieve details of phone numbers using Truecaller
      </p>
      <div className="grid">
        <Login />
      </div>
      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <a
            href={"https://sumithemmadi.github.io/"}
            style={{ paddingLeft: 3 }}
          >
            Sumith Emmadi
          </a>
        </a>
      </footer> */}
    </div>
  );
}

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/truecallerjs/login" />
        )
      }
    />
  );
}
