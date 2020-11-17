import React from 'react'
import Overlaystyles from "./overlaystyles.module.scss"
import {useDispatch} from "react-redux"
import {isinside} from "../gamecontrols/gamesSlice";
import {hitpoint} from "./boardSlice"


export default function Roomoverlay() {


    const dispatch = useDispatch()

    const handleclick = () => {
        const name = document.getElementById("name").value
        if(!name)
            return;
        window.io.emit("roomentered", name)
        dispatch(isinside())
    }
    return (
        <div className={Overlaystyles.overlayfields}>
            <input placeholder="Your Name" name="name" id="name" type="text" />
            <button onClick={handleclick}>Enter Gameroom</button>
        </div>
    )
}
