import React , {useState, useEffect} from 'react'
import Cell from "./cell";
import Boardstyles from "./board.module.scss"
import {useSelector,useDispatch} from "react-redux";
import {updateobject} from "./boardSlice";
// import io from "./boardSlice";

export default function Board() {

    
    const initialarray = useSelector(state => state.board.initialarray)
    const issolved = useSelector(state => state.board.issolved); //selecting data from redux store

    useEffect(() => {
        if(issolved)
            alert("Congrats! You have solved it!");
    } ); //useEffect hook 

    const dispatch = useDispatch();
    window.io.on("havenumbers", object => {
        dispatch(updateobject(object));
         })

    useEffect(() => {
            window.io.emit("givenumbers");
    },[])
    

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
