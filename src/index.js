import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {initiate, updateobject} from "./features/board/boardSlice";
import {mistakes} from "./features/board/resultReducer"
import {onlineusers, competitors, finishedplayers, remtime, waitmode, gamemode, prevgamended} from "./features/gamecontrols/gamesSlice"
import socket from "socket.io-client";
import {hitpoint} from "./features/board/boardSlice"



window.isup = socket(`${hitpoint}/online`);


window.isup.on("onlineusers", allusers => {
  store.dispatch(onlineusers(allusers))
})

window.io.on("disconnect", () => alert("The game is over. Refresh the page to play another game"))
window.io.on("heyclient", data => alert(data));
window.io.on("getinitiated", initialobj => {
        alert("here")
        store.dispatch(initiate(initialobj));
    })

window.io.on("havenumbers", object => {
        store.dispatch(updateobject(object)); //whenever a new object arrives form server, tell the store to update its state
         })

window.io.on("mistakes", mistake => {
  store.dispatch(mistakes(mistake))}
   )

window.io.on("wait", () => {
  store.dispatch(waitmode())
})
window.io.on("refreshpage" , () => {
  store.dispatch(prevgamended())
})
window.io.on("accepted", () => {
  store.dispatch(gamemode())
})

window.io.on("gamestarted", (thisplayer, otherplayers) => {
  store.dispatch(updateobject(thisplayer))
  store.dispatch(competitors(otherplayers))
} )
window.io.on("changedcount", otherplayers => {
  store.dispatch(competitors(otherplayers))
} )
var count = 0, allmistakes = [];
window.io.on("oneset", data => {
    count++ ;
    allmistakes = allmistakes.concat(data.oneset)
    if(count == 3){
      store.dispatch(mistakes(allmistakes))
      count = 0
      allmistakes = []
    }
})

window.io.on("finishedplayers", fplayers => {
  store.dispatch(finishedplayers(fplayers))
})

window.io.on("timerem", timerem => {
  store.dispatch(remtime(timerem))
} )


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
