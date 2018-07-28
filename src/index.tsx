import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


// import App from './App';
import Dashboard from './Dashboard';
import Auth from './Auth';
import './index.css';
import reducers from './reducer';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);




registerServiceWorker();
