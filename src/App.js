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
import Roomoverlay from "./features/board/roomoverlay"
import Onlineusers from "./features/gamecontrols/onlineusers"
import Competitors from "./features/gamecontrols/competitors"



function App() {
  const dispatch = useDispatch()
  const handleclick = () => {
    dispatch(showmistake())
  }

  // const isgameon = useSelector(state => state.games.isgameon)
  const isinside = useSelector(state => state.games.isinside)
  var boardoverlay, inputnumbers, roomoverlay
  if(isinside){
    //  boardoverlay = isgameon ? null : (<div className={Appstyles.overlay}>
    //         <Boardoverlay />
    //         </div> )
    inputnumbers = <div className={Appstyles.gamecontrol}>
          <Inputnums/>
          <button onClick={handleclick} >Show mistakes</button>
          </div> 

  }
  else {
    roomoverlay = <div className={Appstyles.overlay}>
            <Roomoverlay />
            </div>
  }
 
  return (
    <Router>
    <Header/>
    <div className={Appstyles.parentcontainer}>
    <Switch>
      <Route exact path="/">
        <div className={Appstyles.secondparent}>
          <div className={Appstyles.gamearea}>
          <div className={Appstyles.boardandoverlay}>
            {roomoverlay}
            <Board/>
          </div>
           <div className={Appstyles.gamecontrol}>
          {inputnumbers}
          </div>
          </div>
          <div className={Appstyles.sidediv}>
           <Onlineusers/>
           <Competitors/>
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


