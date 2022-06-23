import { Cell } from "./Cell";
import { Color } from "./Color";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureName } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

interface Kings {
    black: Figure | null
    white: Figure | null
}

export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    whiteCheck: boolean = false
    blackCheck: boolean = false
    whiteCheckmate: boolean = false
    blackCheckmate: boolean = false
    history: Board[] = []

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i+j) % 2 == 0) {
                    row.push(new Cell(this, j, i, Color.WHITE, null)) // white
                } else {
                    row.push(new Cell(this, j, i, Color.BLACK, null)) // black
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(x: number , y: number) {
        return this.cells[y][x]
    }

    public findKings(): Kings {
        let kings: Kings = {black: null, white: null}
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const figure = this.cells[i][j].figure
                if (figure?.name === FigureName.KING) {
                    if (figure.color === Color.BLACK) kings = {...kings, black: figure}
                    if (figure.color === Color.WHITE) kings = {...kings, white: figure}
                }
            }
        }
        return kings
    }

    public addFigures() {
        new Rook(Color.BLACK, this.getCell(0, 0))
        new Knight(Color.BLACK, this.getCell(1, 0))
        new Bishop(Color.BLACK, this.getCell(2, 0))
        new Queen(Color.BLACK, this.getCell(3, 0))
        new King(Color.BLACK, this.getCell(4, 0))
        new Bishop(Color.BLACK, this.getCell(5, 0))
        new Knight(Color.BLACK, this.getCell(6, 0))
        new Rook(Color.BLACK, this.getCell(7, 0))

        for (let i = 0; i < 8; i++) {
            new Pawn(Color.BLACK, this.getCell(i, 1))
            new Pawn(Color.WHITE, this.getCell(i, 6))
        }

        new Rook(Color.WHITE, this.getCell(0, 7))
        new Knight(Color.WHITE, this.getCell(1, 7))
        new Bishop(Color.WHITE, this.getCell(2, 7))
        new Queen(Color.WHITE, this.getCell(3, 7))
        new King(Color.WHITE, this.getCell(4, 7))
        new Bishop(Color.WHITE, this.getCell(5, 7))
        new Knight(Color.WHITE, this.getCell(6, 7))
        new Rook(Color.WHITE, this.getCell(7, 7))
    }

    getCopy(): Board {
       const newBoard = new Board()
       newBoard.cells = this.cells
       newBoard.lostBlackFigures = this.lostBlackFigures
       newBoard.lostWhiteFigures = this.lostWhiteFigures
       newBoard.blackCheck = this.blackCheck
       newBoard.whiteCheck = this.whiteCheck
       newBoard.blackCheckmate = this.blackCheckmate
       newBoard.whiteCheckmate = this.whiteCheckmate
       newBoard.history = this.history
       return newBoard
    }

    highlightAvailable(cell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                if (cell?.figure && 
                    (cell?.figure.canMove(target))) {
                        target.availbale = true
                } else {
                    target.availbale = false
                }
                
            }
        }
    }

    countAvailable(cell: Cell | null) {
        let available = 0
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                available += !!cell?.figure?.canMove(target) ? 1 : 0
            }
        }
        return available
    }

    isChekmate(color: Color): boolean {
        let availableAtAll = 0
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const cell = this.cells[i][j]
                if (cell.figure?.color === color) {
                    availableAtAll += this.countAvailable(cell)
                }
            }
        }
        return availableAtAll === 0 ? true : false
    }

}