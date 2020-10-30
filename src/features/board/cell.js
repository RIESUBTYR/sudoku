import React from 'react'
import Cellstyles from "./cell.module.scss"; //'scss module', not a normal scss file

export default function cell(props) {
    var rightborder, bottomborder;
    const {right, bottom} = props.borderinfo; //'destructuring props'
    rightborder = Cellstyles.rightborder;
    bottomborder = Cellstyles.bottomborder;
    return (
        //className attribute is equal to a 'template literal' 
        <div className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""}`} >
            {props.i}{props.j}
        </div>
    )
}
