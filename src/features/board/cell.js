import React, {useState, useEffect} from 'react'
import Cellstyles from "./cell.module.scss"; //'scss module', not a normal scss file
import {useSelector, useDispatch} from 'react-redux' //using Redux inside react components
import { countincrement} from "./boardSlice"; //importing 'redux action creators' corresponding to the reducers in boardSlice file. 



export default function Cell(props) {
    const {i,j} = props; //destructuring  object
    const [value, visibility, inputnum, isright] = props.cellinfo; //destructuring array
    const cellid = (i*10)+j; //a two digit integer
    var rightborder, bottomborder;
    const {right, bottom} = props.borderinfo; //destructuring
    rightborder = Cellstyles.rightborder;
    bottomborder = Cellstyles.bottomborder;
    var elementtorender;


    const clientid = useSelector(state => state.board.clientid);
     const highlightcell = () => {
        window.io.emit("highlightcell", cellid);
    }

    const hightlightedcell = useSelector(state => state.board.highlightedcell);
   
    
    
    useEffect(() => {
        var element = document.getElementById(cellid);
        const clientids = hightlightedcell.filter((e) => { //clientids is an array of objects
        return e.cellid == cellid
        }); 
        const clientsarray = clientids.map(e => {
            return e.clientid
        })//extract only the clientids and store them in an array
        const isthisclient = clientsarray.includes(clientid,0);
        const otherclients = clientsarray.filter((e) => {
            return e != clientid
        }); //removes this client id from the array
        console.log(otherclients);
        if(isthisclient)
            element.classList.add(Cellstyles.highlight);
        else
            element.classList.remove(Cellstyles.highlight);
        if(otherclients.length)
            element.classList.add(Cellstyles.highlightother);
        else
            element.classList.remove(Cellstyles.highlightother);
        if(isthisclient && otherclients.length)
            element.classList.add(Cellstyles.samecell)
        else 
            element.classList.remove(Cellstyles.samecell)

    })
    useEffect(() => {
        var element = document.getElementById(cellid);
        if(inputnum){
            element.innerHTML = inputnum;
        }
    })
    

    if(visibility)
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.visible} `} >
            {value}
        </div>
    else
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.hidden} `} onClick={highlightcell} ></div>

   

    return elementtorender
       
    
}
