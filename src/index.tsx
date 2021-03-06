import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './common/http';
import registerServiceWorker from './registerServiceWorker';

import Login from './container/Login/Login';
import Register from './container/Register/Register';
import BossInfo from './container/BossInfo/BossInfo';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';
import Dashboard from './component/Dashboard/Dashboard'

import store from './store/index';
import './assets/style/index.css';
import AuthRoute, { IAuthPorps } from './component/AuthRoute/AuthRoute';
import Chat from './component/Chat/Chat';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/* 因为没写props会默认给组建赋值{} ,所以与组建内部的props类型不一致 */}
        <AuthRoute {...{} as IAuthPorps} />
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);




registerServiceWorker();
