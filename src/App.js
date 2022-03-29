import {useState, useEffect} from "react";
import "./App.css";
import reset from "./refreshing.png";
import sound from "./sound.wav";
function App(){

  const [data, setData] = useState(Array(9).fill(null));
  const [yourTurn, setYourTurn] = useState("true");
  const [winner , setWinner]= useState(null)
  const [p1Wins , setP1Wins] = useState(0);
  const [p2Wins , setP2Wins] = useState(0);
  const [banner , setBanner]= useState(false);

  const audio = new Audio(sound);
//player moves
  function handleClick(i){
    const userMoves=[...data];
    if(winner || userMoves[i]) return;
    userMoves[i]= yourTurn==="true"&&"X";
    setData(userMoves);
    setYourTurn("false");
    audio.play();
  }
// computer moves
  function cpuMoves(index){
    const comMoves = data;
    comMoves[index] = "O"
    setData(comMoves)
    setYourTurn("true");
  }

// checking winner
  function checkWinner(line){
    const moves = [
    		[0, 1, 2],
    		[3, 4, 5],
    		[6, 7, 8],
    		[0, 3, 6],
    		[1, 4, 7],
    		[2, 5, 8],
    		[0, 4, 8],
    		[2, 4, 6],
    	];
    for( var i=0; i<moves.length; i++){
      const [a,b,c] = moves[i];
      if (line[a] && line[a] === line[b] && line[a] === line[c]){
        return line[a];
      }
    }
    return null;
  }
// handling reset
  function handleReset(){
    setData(Array(9).fill(null));
    setYourTurn("true");
    setWinner(null);
  }


// Updating wins after every game
  useEffect( ()=>{
    setWinner(checkWinner(data));
      if(winner==="X"){
        setP1Wins(p1Wins + 1);
        console.log(p1Wins);
      }else if(winner==="O"){
        setP2Wins(p2Wins+1);
      }
      if(winner){
        setBanner(true)
      }
  // checking empty indexes and genrating cpu moves
      if(yourTurn==="false"){
        const emptyIndex = data.map((box, index:number)=> box === null? index : null)
        .filter(val => val !==null);
        const randomIndex = emptyIndex[Math.floor(Math.random()*emptyIndex.length)];
        cpuMoves(randomIndex);
      }

  },[winner,data,yourTurn])

  return(
    <>
      <div className="container">
        <div className="game-title"><p>Tic</p> <p>Tac</p> <p>Toe</p></div>
          <div className="game-details">
            <p className="players-logo">x<span>o</span></p>
            <p className="stats">Turn {yourTurn?"X":"O"}</p>
            <button type="button" className="reset-button" onClick={handleReset}><img src={reset} className="reset-icon" alt="resetButton"/></button>
          </div>
        {
           banner && <div className="winner">
                       <h2>{winner && winner+" Wins"}</h2>
                       <div>
                       <button className="banner-btn" onClick={()=>{setBanner(false);}} type="button">Close</button>
                       <button className="banner-btn" onClick={()=>{setBanner(false); setWinner(null);  setData(Array(9).fill(null)); setYourTurn("true")}} type="button">Play Again</button>
                       </div>
                     </div>
        }
        <div className="game">
            <div className="box"  style={{color: data[0]==="X"?"#33c3bf":"#edae36"}}value="0" onClick={()=> handleClick(0)}>{data[0]}</div>
            <div className="box"  style={{color: data[1]==="X"?"#33c3bf":"#edae36"}}value="1" onClick={()=> handleClick(1)}>{data[1]}</div>
            <div className="box"  style={{color: data[2]==="X"?"#33c3bf":"#edae36"}}value="2" onClick={()=> handleClick(2)}>{data[2]}</div>
            <div className="box"  style={{color: data[3]==="X"?"#33c3bf":"#edae36"}}value="3" onClick={()=> handleClick(3)}>{data[3]}</div>
            <div className="box"  style={{color: data[4]==="X"?"#33c3bf":"#edae36"}}value="4" onClick={()=> handleClick(4)}>{data[4]}</div>
            <div className="box"  style={{color: data[5]==="X"?"#33c3bf":"#edae36"}}value="5" onClick={()=> handleClick(5)}>{data[5]}</div>
            <div className="box"  style={{color: data[6]==="X"?"#33c3bf":"#edae36"}}value="6" onClick={()=> handleClick(6)}>{data[6]}</div>
            <div className="box"  style={{color: data[7]==="X"?"#33c3bf":"#edae36"}}value="7" onClick={()=> handleClick(7)}>{data[7]}</div>
            <div className="box"  style={{color: data[8]==="X"?"#33c3bf":"#edae36"}}value="8" onClick={()=> handleClick(8)}>{data[8]}</div>
            <div className="player-box player1"><p>Player X</p> <p>{p1Wins}</p></div>
            <div className="player-box mode"><p>Mode</p><p>Player vs CPU</p></div>
            <div className="player-box player2"><p>CPU O</p> <p>{p2Wins}</p></div>
        </div>

      </div>
    </>
  )
}

export default App;
