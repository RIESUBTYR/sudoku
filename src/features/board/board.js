import React , {useState} from 'react'
import Cell from "./cell";
import Boardstyles from "./board.module.scss"

export default function board() {

    // const [correctcount, increasecount] = useState(0);

    // const incrementor = ivalue => {
    //     increasecount(correctcount + ivalue);
    // }

    var allcells = [], key=0;
    for(var i=1;i<10;i++)
        for(var j=1;j<10;j++){
        var borderinfo = {
            right : 0,
            bottom : 0
        };
        if(i==3 || i==6) //this logic is used to create borders for all the nine 3x3 squares
             borderinfo.bottom = 1;
        if(j==3 || j==6)    
            borderinfo.right = 1;
        allcells.push(<Cell borderinfo={borderinfo} key={key++} i={i} j={j} />);
    }
    return (
        <div className={Boardstyles.board} >
            {allcells}
        </div>
    )
}
