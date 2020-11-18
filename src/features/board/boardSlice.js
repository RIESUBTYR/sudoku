import {createSlice} from "@reduxjs/toolkit";
import socket from "socket.io-client";
import object from "./initialarray";

const url = "http://localhost:3001";
const heroku = "https://reduxokubackend.herokuapp.com"
export const hitpoint = (window.location.href.includes("localhost",0)) ? url : heroku ; 

window.io = socket(hitpoint+"/gameplay"); //we have to make this socket instance accessible in all our components. That is why we are using the 'window' work to declare it as a global variable. 
window.io.on("connection", () => console.log("normal connection to server"))



const boardSlice = createSlice({ //learn about createSlice in redux
    name : "board",
    initialState : object, 
    reducers : {
        initiate(state, action){
            state = action.payload;
            return state;
        },
        updateobject : {
            reducer(state, action) {
            const clientid = state.clientid;
            state = {...action.payload, clientid: clientid};
            return state;
            }
            // prepare(object, clientid){
            //     const newobject = {...object, clientid: clientid};
            //     return {
            //         payload : newobject
            //     }
            // } 
        }
        ,
        highlighter(state, action){
            const {cellid} = action.payload;
            state.highlightedcell = cellid;
            return state;
        },

        inputnumsetter(state, action){
            const {inputnum} = action.payload;
            state.inputnum = {inputnum : inputnum, inputterid : state.highlightedcell};
            return state;
        },

        countincrement(state,action){
            const {sign} = action.payload;
            if(state.correctcount + sign ==state.requiredcorrect)
                state.issolved = 1;
            state.correctcount += sign;
            return state;
        }

    }
});


export default boardSlice.reducer; //export the reducers
export const {highlighter, inputnumsetter, countincrement, updateobject,initiate} = boardSlice.actions; //export the action creators