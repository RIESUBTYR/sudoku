import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/inputnums/inputnums"
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import {showmistake} from "./features/board/resultReducer"
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import Header from "./features/header/header"


function App() {
  const dispatch = useDispatch()
  const handleclick = () => {
    dispatch(showmistake())
  }
  return (
    <Router>
    <Header/>
    <div className={Appstyles.parentcontainer}>
    <Switch>
      <Route exact path="/">
          <div className={Appstyles.gamearea}>
          <Board/>
          <div className={Appstyles.gamecontrol}>
          <Inputnums/>
          <button onClick={handleclick}>Show mistakes</button>
          </div>
          </div>
      </Route>
      <Route path="/documentation">
        <div>This is the documentation page</div>
      </Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;


