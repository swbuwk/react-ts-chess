import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import CheckmateModal from './components/CheckmateModal';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Color } from './models/Color';
import { Figure, FigureName } from './models/figures/Figure';
import { Player } from './models/Player';

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Color.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Color.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    function restart () {
        const newBoard = board
        newBoard.initCells()
        newBoard.addFigures()
        
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }

    function swapTurn() {
      setCurrentPlayer(currentPlayer?.color === Color.WHITE ? blackPlayer : whitePlayer)
    }

    useEffect(() => {
        restart()

    }, [])

  return (
    <div className="App">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer = {currentPlayer}
        swapTurn = {swapTurn}
        />
        <div className='lost-block'>
          <LostFigures figures={board.lostBlackFigures} title="Съеденные фигуры черных"/>
          <LostFigures figures={board.lostWhiteFigures} title="Съеденные фигуры белых"/>
        </div>
    </div>
  );
}

export default App;
