import React , {useState, useEffect} from 'react'
import Cell from "./cell";
import Boardstyles from "./board.module.scss"
import {useSelector} from "react-redux";

export default function Board() {

    
    var initialarray = [
        [[7,1],[9,1],[2,1],[4,0],[8,1],[3,0],[6,1],[5,0],[1,0]],
        [[8,0],[6,0],[5,1],[9,0],[7,0],[1,1],[4,0],[3,1],[2,1]],
        [[4,0],[3,0],[1,1],[6,1],[5,1],[2,0],[9,0],[7,1],[8,0]],
        [[9,0],[5,0],[8,1],[7,0],[6,1],[4,0],[2,1],[1,0],[3,1]],
        [[6,1],[7,1],[3,1],[2,1],[1,0],[9,1],[8,0],[4,1],[5,0]],
        [[2,0],[1,1],[4,0],[8,1],[3,0],[5,0],[7,1],[9,0],[6,1]],
        [[5,1],[8,0],[9,0],[1,0],[4,1],[6,1],[3,1],[2,0],[7,1]],
        [[3,0],[4,1],[7,1],[5,1],[2,0],[8,1],[1,0],[6,0],[9,1]],
        [[1,1],[2,1],[6,0],[3,1],[9,1],[7,1],[5,0],[8,1],[4,0]]
    ]
        
    const issolved = useSelector(state => state.board.issolved); //selecting data from redux store

    useEffect(() => {
        if(issolved)
            alert("Congrats! You have solved it!");
    } ); //useEffect hook 

    var allcells = [], key=0;
    for(var i=1;i<10;i++)
        for(var j=1;j<10;j++){
        var borderinfo = {
            right : 0,
            bottom : 0
        };
        if(i==3 || i==6) //this logic is used to create borders for all the nine 3x3 squares
             borderinfo.bottom = 1; //cells which has 3 or 6 as index values should have right/bottom border
        if(j==3 || j==6)    
            borderinfo.right = 1;
        allcells.push(<Cell cellinfo = {initialarray[i-1][j-1]} borderinfo={borderinfo} key={key++} i={i} j={j} />); //list rendering in React
    }

    

    return (
        //learn about css/scss modules and how to use them in react
        <div className={Boardstyles.board} >
            {allcells}
        </div>
    )
}
