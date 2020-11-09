import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/inputnums/inputnums"
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import {showmistake} from "./features/board/resultReducer"
function App() {
  const dispatch = useDispatch()
  const handleclick = () => {
    dispatch(showmistake())
  }
  return (
    <div className={Appstyles.parentcontainer}>
     <Board/>
     <Inputnums/>
     <button onClick={handleclick}>show mistake</button>
    </div>
  );
}

export default App;
