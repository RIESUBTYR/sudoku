import React from 'react'
import {useSelector} from "react-redux"
import Onelineuserstyles from "./onlineusers.module.scss"

export default function Onlineusers() {

    const allusers = useSelector(state => state.games.onlineusers)
    var users;
    if(allusers.length)
        users = allusers.map(oneuser => {
        return <div >{oneuser}</div>
        })
    else 
        users = <div className={Onelineuserstyles.nousers}>No Player online</div>
    return (
        <div className={Onelineuserstyles.wrapper}>
            <h3>Players Online</h3>
            {users}
        </div>
    )
}
