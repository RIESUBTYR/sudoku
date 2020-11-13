import {createSlice} from "@reduxjs/toolkit"
import { initiate } from "../board/boardSlice";

const initial = {
    isgameon : 0
}

const gamesSlice = createSlice({
    name: "games",
    initialState : initial,
    reducers: {
        isgameon : (state) => {
            state.isgameon = 1
        }
    }
});

export default gamesSlice.reducer;
export const {isgameon} = gamesSlice.actions;