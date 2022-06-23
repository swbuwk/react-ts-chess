import React, { FC } from 'react'
import { Cell } from '../models/Cell'
import { Color } from '../models/Color'
import { FigureName } from '../models/figures/Figure'

interface cellProps {
    cell: Cell,
    selected: boolean,
    cellClick: (cell: Cell) => void
}

const CellComponent: FC<cellProps> = ({cell, selected, cellClick}) => {
  return (
    <div className={["cell", cell.color,
                    selected ? "selected" : "",
                    cell.availbale && cell.figure ? "available-with-figure" : "",
                    cell.figure?.name === FigureName.KING && cell.figure.color === Color.BLACK && cell.board.blackCheck ? "under-attack" : "",
                    cell.figure?.name === FigureName.KING && cell.figure.color === Color.WHITE && cell.board.whiteCheck ? "under-attack" : ""]
                    .join(" ")}
          onClick={() => cellClick(cell)}>{cell.figure?.logo &&
      <img className={cell.figure.color === Color.BLACK ? "black-figure" : "white=figure"} src={cell.figure.logo}></img>
      }
      <div className={cell.availbale ? "border" : ""}></div>
      {cell.availbale && !cell.figure && <div className='available'/>}
    </div>
  )
}

export default CellComponent