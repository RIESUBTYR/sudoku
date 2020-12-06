
import React from 'react'
import Docstyles from "./docstyles.module.scss";
import Img1 from "./pics/1.png"
import Img2 from "./pics/2.png"
import Img3 from "./pics/3.png"
import Img4 from "./pics/4.png"
import Img5 from "./pics/5.png"
import Img6 from "./pics/6.png"
import Img7 from "./pics/7.png"
import Img8 from "./pics/8.png"
import Img9 from "./pics/9.png"
import Img10 from "./pics/10.png"

export default function Docs() {
    return (
        <div className={Docstyles.parent}>
            <h1>Reduxoku -  Seamless Real time Multiplayer Sudoku</h1>
            <p>
                The team behind Reduxoku is a group of students from IIITDM Kancheepuram , batch of 2022/2023 . And Reduxoku was built as a project for one of our courses here in college. </p><p>

Note : If you don’t have a group to play Reduxoku with then open Reduxoku in multiple tabs in your browser to see how multiplayer gameplay is. 

            </p>
            <h3>Why the name ‘Reduxoku’ ?</h3>
            <p>
            It is because Redux.js is used in building and implementing a UI for the app. 
            </p>
            <h3>Technologies used in Reduxoku</h3>
            <p>React Hooks, Redux for state management, React-Router,, Socket-io Client module to communicate back and forth with the backend-server in realtime. No CSS framework/library is used in the project. All the styles are written from scratch. </p><p>

The back-end for the app is a Node.js server . It uses Express and Socket.io modules . Three child processes created using the  node js Child_Process module also run along with the main process. The child processes are created to do some heavy lifting off the main process the explanation of which will come later in this documentation. 
</p>
            <h3>How the data flows in the app</h3>
            <p>The socket in the client side emits multiple events and each event has a unique name. The socket also sends some data when it emits these events. </p><p>

The socket.io module in the server will be listening for these events. When an event is emitted by the client, the server takes the data, does some job and emits an event in response along with the response data. </p> <p>

The following is a snippet from the client side code . The function ‘highlightcell’ will be called when a player clicks on one of the 81 cells. The cells have ids whose pattern is 11, 12...19,21,22…...99 . The function will emit the socket.io event named ‘cellhighlight’ along with the cellid of the cell which was clicked on by the player.  
</p>
        <div className={Docstyles.imgwrap}>

        <img src={Img1} alt=""/>
        </div>
        <p>
            The following snippet is from the server-side code . The server listens to the ‘cellhighlight’ event emitted by the client, and passes the data which is the cellid to the function. The function will send the cellid along with the socketid to the three child processes. Note that, every player will have one socket connection with the server, and each socket has an unique id . Therefore we can uniquely identify each player by the socketid . The child processes are now provided with the data about which player has selected which cell. 

        </p>
         <div className={Docstyles.imgwrap}>
            
        <img src={Img2} alt=""/>
        </div>
            <h3>Offloading using child processes (multiprocessing)</h3>
            <p>
                A crucial point about Node.js servers is that they are single-threaded .i.e whenever a new client requests the server, a new thread will not be created to handle the request, whereas in servers like Apache, a new thread is created for every new client . As for Node.js it uses something called ‘Event-loop’ to respond to all requests quickly even though all requests are handled by only one thread. 

            </p>
            <p>
                This will work fine as long as the works done in the main thread are I/O bound and not CPU bound.i.e CPU intensive tasks will block the execution of other tasks in the main thread. Therefore the server will be able to respond to the clients only after the CPU intensive task is completed. Therefore if our app has to do some CPU intensive task then we have to hand over that task to child processes(multiprocessing)/worker threads(multithreading) so as to not block the main thread and slow down the response time of the app. 

            </p>
            <p>
                Since frequently validating user inputs and checking if the Sudoku puzzle has been solved is a CPU intensive task, we are doing it from within child processes(multiprocessing). The child processes will receive necessary data from the main process , do CPU intensive tasks and send back the response data to the main-process which will send the data back to the clients.  

            </p>
            <p>
                The following snippet will create three child processes. 
            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img3} alt=""/>
        </div>
         <div className={Docstyles.imgwrap}>
            
        <img src={Img4} alt=""/>
        </div>
            <h3>Communication between children and parent</h3>
            <p>
                The following is from the code corresponding to the child processes. The child processes do a variety of tasks the most important of which is to check for mistakes by the player and find if the puzzle has been solved. The ‘e’ object received from the parent will have information about the type of task the child should do and data required for the task. The children will do the task and send the response using ‘process.send(.....)’

            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img5} alt=""/>
        </div>
            <h3>Validating input and finding mistakes of a player</h3>
            <p>
                There are three child processes. Whenever a player enters a value into one of the cells, one child process will evaluate the corresponding row , another child will evaluate the corresponding column and the third for the corresponding 3x3 box. Each child process will run two nested loops using which it will find all those cells whose values appear in other cells from the same row/column/box . 

            </p>
            <p>
                For example, look at the following scenario

            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img6} alt=""/>
        </div>
            <p>
                The player entered the value 1 into the cell whose id is 38 . And since 1 is also present in the cells 37 and 68 , we get the following result from the child processes

            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img7} alt=""/>
        </div>
            <p>
                Child process with id 0 checks through the row and finds that cells 37 and 38 have the same value. Likewise child with id 1 checks through the corresponding column and child with id 2 checks through the box. 

            </p>
            <p>
                The child processes store these mistakes in an array and keeps on updating them, and after the client has filled all the cells, if the mistakes array is empty it means the player has solved the puzzle and the parent will be notified about it. 
            </p>
            <p>
                The child processes  keep on sending relevant data to the parent, which in turn will be sent to the players to make appropriate changes in the UI .  
            </p>
            <h3>Automating the Gameplay</h3>
            <p>
                There is a master object which has all the information about the game - no.of players in the game, the sudoku board of each player, time taken by each player to finish the game etc. When the first player enters the game room a 30sec timer will be started. Other players who try to enter the gameroom(in the frontend) before this 30sec elapses, an entry will be created for them in the master object , and their sockets will be added to the sockets-room named ‘gameroom’ . Note that socket.io offers a feature called ‘rooms’ which helps the developer to classify socket connections. Players who try to enter the gameroom after the 30 seconds elapse or if already 10players have joined the gameroom before the 30sec, their sockets will be added to the socket-room named ‘waiters’ . 
            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img8} alt=""/>
        </div>
            <p>
                Information about the on going game like the initial sudoku board,  progress of other players, time taken by other players to finish the game etc. will only be sent to the players whose sockets are in the ‘gameroom’ room. As for the clients whose sockets  are in the room named ‘waiters’  they will not receive this information. 

            </p>
            <p>
                When a player who is playing the game leaves, by closing the browser tab/refreshing the page, then his entry will be removed from the master object. Likewise, if a player has completed the game by entering all the right values, his entry will be removed from the master object. Therefore, if there are no entries left in the master object, it means the current game has ended. The entire master object will be then be reset, and the waiters will be notified that the previous game has ended. 
            </p>
            <p>
                The following is the code that resets the master object when the last player goes offline/finishes the game

            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img9} alt=""/>
        </div>
            <p>
                Notify the waiters if all entries are removed from master object. 
            </p>
             <div className={Docstyles.imgwrap}>
            
        <img src={Img10} alt=""/>
        </div>
            <h3>End </h3>
            <p>Thank you for reading the docs! We  hope that the sections above have given you a concise and precise description of the important aspects of Reduxoku. </p>
        </div>
    )
}
