import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {initiate, updateobject} from "./features/board/boardSlice";


window.io.on("getinitiated", initialobj => {
        store.dispatch(initiate(initialobj));
    })

window.io.on("havenumbers", object => {
        console.log("dispatching updateobject")
        store.dispatch(updateobject(object)); //whenever a new object arrives form server, tell the store to update its state
         })
window.io.on("inputnumchanged", object => {
  store.dispatch(updateobject(object))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
