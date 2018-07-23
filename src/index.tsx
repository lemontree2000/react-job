import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


import App from './App';
import './index.css';
import { counter } from './redux.index';

const store = createStore(counter, composeWithDevTools(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById('root') as HTMLElement
);




registerServiceWorker();
