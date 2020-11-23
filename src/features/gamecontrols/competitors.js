import React from 'react'
import { useEffect } from 'react'
import {useSelector} from "react-redux"
import Onlineusers from './onlineusers'
import Onelineuserstyles from "./onlineusers.module.scss"


export default function Competitors() {

    var allcompetitors = useSelector(state => state.games.competitors)
    const correctcount = useSelector(state => state.board.correctcount)
    const requiredcorrect = useSelector(state => state.board.requiredcorrect)
    console.log(`required correct ${requiredcorrect}`)

    useEffect(() => {
        window.io.emit("correctcount" , correctcount)
    }, [correctcount])

    useEffect(() => {
       
        var allbars = document.getElementsByClassName(Onelineuserstyles.innerbar)
        Array.from(allbars).forEach(e => {
            var progress = e.getAttribute("data-correctcount")
            console.log(progress)
            e.style.width = `${progress/requiredcorrect * 150}px`
        })
    })

    allcompetitors = allcompetitors.slice().sort((a, b) => {return b.correctcount - a.correctcount});

    var i=0;
    var comps = allcompetitors.map(onecomp => {
    return (<div key={i++}className={Onelineuserstyles.oneplayer}>
                <div className={Onelineuserstyles.names}>
                     {`${onecomp.name}   ${onecomp.correctcount}/${requiredcorrect}`}
                </div>
                <div className={Onelineuserstyles.barwrapper}>
                    <div data-correctcount={onecomp.correctcount} style={{backgroundColor : onecomp.color}} className={Onelineuserstyles.innerbar}>
                    </div>
                </div>
            </div>)
        })
    return (
        <div className={Onelineuserstyles.wrapper}>
            {comps}
        </div>
    )

}
