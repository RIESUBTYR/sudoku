import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/inputnums/inputnums"
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";

function App() {

  
  return (
    <div className={Appstyles.parentcontainer}>
     <Board/>
     <Inputnums/>
    </div>
  );
}

export default App;
