// import React , {useState, useEffect} from 'react'
// import socketIOClient from "socket.io-client";
// import {useSelector, useDispatch} from 'react-redux' //using Redux inside react components
// import {highlighter, countincrement, inputnumsetter} from "./boardSlice"; //importing 'redux action creators' corresponding to the reducers in boardSlice file. 

// // const io = socketIOClient("http://localhost:3001/"); 

// export default function Fakecomp() {

//     const dispatch = useDispatch();
//     const highlightedcell = useSelector((state) => state.board.highlightedcell);
//     const inputnum = useSelector(state => state.board.inputnum);

//     useEffect(() => {    
//     io.on("highlightchanged", cellid => {
//         alert(cellid)
//         dispatch(highlighter({cellid : cellid})) 
//     })
//     io.on("inputnumchanged", inputnum => {
//         dispatch(inputnumsetter({inputnum : inputnum})) 
//     })

//   },[]); // [] as additional argument so that this effect runs exactly once and that is when the page first loads

//     useEffect(() => {
//         io.emit("highlightchange", highlightedcell);
//     }, [highlightedcell])
//     useEffect(() => {
//         io.emit("inputnumchange", inputnum.inputnum);
//     }, [inputnum])
//     return (
//         <div>

//         </div>
//     )
// }
