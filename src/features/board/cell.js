import React, {useState, useEffect} from 'react'
import Cellstyles from "./cell.module.scss"; //'scss module', not a normal scss file
import {useSelector, useDispatch} from 'react-redux'
import {highlighter, countincrement} from "./boardSlice";

export default function Cell(props) {
    const {i,j} = props;
    const [value, visibility] = props.cellinfo; //destructuring array
    const cellid = (i*10)+j;
    var rightborder, bottomborder;
    const {right, bottom} = props.borderinfo; //'destructuring from props'
    rightborder = Cellstyles.rightborder;
    bottomborder = Cellstyles.bottomborder;

    
    const dispatch = useDispatch();
     const highlightcell = () => {
        dispatch(highlighter({cellid : cellid}))
    }

    const hightlightedcell = useSelector((state) => state.board.highlightedcell);
    const inputnum = useSelector(state => state.board.inputnum);

    const [flag, setflag] = useState(0);
    
    
    useEffect(() => {
        var element = document.getElementById(cellid);
        if(hightlightedcell == cellid){
            element.classList.add(Cellstyles.highlight);
        }
        else  element.classList.remove(Cellstyles.highlight);
    })
    useEffect(() => {
        var element = document.getElementById(cellid);
        if(hightlightedcell == cellid && inputnum.inputterid == cellid){
            element.innerHTML = inputnum.inputnum;
            if(inputnum.inputnum == value && flag == 0){
                dispatch(countincrement({sign: 1}));
                setflag(1);
            }
            else if(flag && inputnum.inputnum != value){
                dispatch(countincrement({sign: -1}));
                setflag(0);
            }
        }
    })
    
    const [tempvalue, settempvalue] = useState(null);

    var elementtorender;
    if(visibility)
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.visible} `} >
            {value}
        </div>
    else
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.hidden} `} onClick={highlightcell} >
            {tempvalue}
        </div>

   

    return elementtorender
       
    
}
