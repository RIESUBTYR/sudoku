import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/inputnums/inputnums"
import Fakecomp from "./features/board/fakecomp";
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";

function App() {

  
  return (
    <div className={Appstyles.parentcontainer}>
     <Board/>
     <Inputnums/>
     <Fakecomp/>
    </div>
  );
}

export default App;
