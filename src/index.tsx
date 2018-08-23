import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";

import './common/http';
import registerServiceWorker from './registerServiceWorker';

import Login from './container/Login/Login';
import Register from './container/Register/Register';
import BossInfo from './container/BossInfo/BossInfo';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';

import store from './store/index';
import './assets/style/index.css';
import AuthRoute, { IAuthPorps } from './component/AuthRoute/AuthRoute';



function Boss() {
  return <div>boss</div>
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/* 因为没写props会默认给组建赋值{} ,所以与组建内部的props类型不一致 */}
        <AuthRoute {...{} as IAuthPorps} />
        <Route path="/bossinfo" component={BossInfo} />
        <Route path="/geniusinfo" component={GeniusInfo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/boss" component={Boss} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);




registerServiceWorker();
