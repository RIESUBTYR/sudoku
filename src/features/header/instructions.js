import React from 'react'
import Instructionstyles from "./instructionstyles.module.scss"

export default function Instructions() {
    return (
        <div className={Instructionstyles.wrapper}>
            <h3>Instructions to join the game</h3>
            <ul>
                <li>A 30sec timer will be started when the first person enters the gameroom</li>
                <li>9 more players can enter the gameroom before this 30sec elapses</li>
                <li>After 30sec the game will begin with all the players who joined before 30secs</li>
                <li>Those who try to enter gameroom after the 30sec will have to wait until the present game is over</li>
            </ul>
            <h3>Instructions to play the game smartly</h3>
            <ul>
                <li>The progress bar of a player will be filled even if he enters a wrong value in one of the cells</li>
                <li>The game will be solved only if all the values entered are correct values</li>
                <li>Make smart use of the 'Show Mistakes' button. You can use it to find the value for 
a cell. Pressing the button will reveal all those cells in which wrong values are entered. </li>
                <li>For example, if you know for sure that a cell can only have one of 3,5,8 as the right value,
then you can press Show Mistakes after entering each of those three values. The value for which no 
red mark was shown after pressing Show Mistakes is the right value for the cell. </li>
                <li>Since you can find the value for a cell by using the Show Mistakes button
alone and completely neglecting the rest of the corresponding row, column or box there
is a limitation placed for the usage of the button .i.e once you click the button, you will have to
wait 10 secs before you can use the button once more. </li>
            </ul>
        </div>
    )
}
