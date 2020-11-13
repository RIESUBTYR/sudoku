import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/gamecontrols/inputnums"
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {showmistake} from "./features/board/resultReducer"
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import Header from "./features/header/header"
import Boardoverlay from "./features/board/boardoverlay"



function App() {
  const dispatch = useDispatch()
  const handleclick = () => {
    dispatch(showmistake())
  }

  const isgameon = useSelector(state => state.games.isgameon)
  var boardoverlay, inputnumbers 
  boardoverlay = isgameon ? null : (<div className={Appstyles.overlay}>
            <Boardoverlay />
            </div> )
  inputnumbers = isgameon ? (<div className={Appstyles.gamecontrol}>
          <Inputnums/>
          <button onClick={handleclick} >Show mistakes</button>
          </div> ): null;
  return (
    <Router>
    <Header/>
    <div className={Appstyles.parentcontainer}>
    <Switch>
      <Route exact path="/">
          <div className={Appstyles.gamearea}>
          <div className={Appstyles.boardandoverlay}>
            {boardoverlay}
            <Board/>
          </div>
            {inputnumbers}
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


