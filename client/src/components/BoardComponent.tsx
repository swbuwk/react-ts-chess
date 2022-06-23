import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board"
import { Cell } from "../models/Cell";
import { Figure } from "../models/figures/Figure";
import { Pawn } from "../models/figures/Pawn";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import CheckmateModal from "./CheckmateModal";

interface boardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapTurn: () => void;
}

const BoardComponent: FC<boardProps> = ({board, setBoard, currentPlayer, swapTurn}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function cellClick(cell: Cell) {
    if (selectedCell && selectedCell.figure?.canMove(cell)) {
      selectedCell.makeTurn(cell)
      setBoard(selectedCell.board)
      swapTurn()
      setSelectedCell(null)
    } else {
      if (cell.figure?.color !== currentPlayer?.color) return
      setSelectedCell(cell)
    }
  }

  useEffect(() => {
    highlightAvailable()
  }, [selectedCell])

  function highlightAvailable() {
    board.highlightAvailable(selectedCell)
    updateBoard()
  }

  function undoMove() {
    const newBoard = board.history[board.history.length-2]
    console.log(newBoard)
    setBoard(newBoard)
  }
  

  function updateBoard() {
    const newBoard = board.getCopy()
    setBoard(newBoard)
  }

  return (
    <div className='board'>
        {board.cells.map((row, i) =>
        <React.Fragment key={i}>
            {row.map(cell =>
                <CellComponent
                  cell={cell}
                  key={cell.id}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  cellClick={cellClick}></CellComponent>
            )}
        </React.Fragment>
        )}
        <button onClick={undoMove}>undo</button>
        <CheckmateModal isBlackCheckmate={board.blackCheckmate} isWhiteCheckmate={board.whiteCheckmate}/>
    </div>
  )
}

export default BoardComponent