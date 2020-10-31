import {createSlice} from "@reduxjs/toolkit";

var init = {
    highlightedcell : null,
    inputnum : {inputnum: null, inputterid : null},
    correctcount : 0,
    requiredcorrect : 81-43,
    issolved : 0
}

const boardSlice = createSlice({
    name : "board",
    initialState : init, 
    reducers : {
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


export default boardSlice.reducer;
export const {highlighter, inputnumsetter, countincrement} = boardSlice.actions;