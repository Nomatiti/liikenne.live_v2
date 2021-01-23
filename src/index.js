import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from "./Redux/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css';
import { Frontpage } from './Sites';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route exact path="/">
                      <Frontpage />
                  </Route>
                  <Route path="/app">
                      <App />
                  </Route>
              </Switch>
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
