import React from 'react'
import {useSelector} from "react-redux"
import Onelineuserstyles from "./onlineusers.module.scss"


export default function Competitors() {

    const allcompetitors = useSelector(state => state.games.competitors)
    var comps = allcompetitors.map(onecomp => {
        return <div >{onecomp.name}</div>
        })
    return (
        <div className={Onelineuserstyles.wrapper}>
            <h3>Competitors </h3>
            {comps}
        </div>
    )

}
