import React from 'react'
import Overlaystyles from "./overlaystyles.module.scss"
import {useDispatch} from "react-redux"
import {isgameon} from "../gamecontrols/gamesSlice";

export default function Boardoverlay() {

    const dispatch = useDispatch()

    const handleclick = () => {
        dispatch(isgameon())
    }
    return (
        <div className={Overlaystyles.overlayfields}>
            <input placeholder="Your Name" name="name" type="text"/>
            <select name="mode" id="">
                <option id="single"value="single">Single Player</option>
                <option id="dual"value="dual">2-Player Team</option>
            </select>
            <button onClick={handleclick}>START</button>
        </div>
    )
}
