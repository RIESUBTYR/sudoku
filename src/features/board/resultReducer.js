import {createSlice} from "@reduxjs/toolkit"

const initial = {
    mistakes : [],
    issolved : 0,
    showmistake : 0
}

const resultSlice = createSlice({
    name : "result",
    initialState : initial,
    reducers: {
        mistakes : (state,action) => {
            state.mistakes = action.payload
        },
        showmistake: (state) => {
            state.showmistake++
        }
    }
})

export default resultSlice.reducer
export const {mistakes, showmistake} = resultSlice.actions