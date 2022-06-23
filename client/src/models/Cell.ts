import { Board } from "./Board";
import { Color } from "./Color";
import { Figure, FigureName } from "./figures/Figure";
import { Pawn } from "./figures/Pawn";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    figure: Figure | null;
    board: Board;
    availbale: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Color, figure: Figure | null) {
        this.x = x
        this.y = y
        this.color = color
        this.board = board
        this.figure = figure
        this.id = Math.random()
        this.availbale = false
    }

    isEmpty() {
        return this.figure === null
    }

    getCopy(cell: Cell) {
        const newCell = new Cell(cell.board, cell.x, cell.y, cell.color, cell.figure)
        return newCell
    }

    checkVertical(target: Cell): boolean {
        if (this.x !== target.x) return false

        const max = Math.max(this.y, target.y)
        const min = Math.min(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    checkHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false

        const max = Math.max(this.x, target.x)
        const min = Math.min(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    
    checkDiagonal(target: Cell): boolean {
        const absY = Math.abs(target.y - this.y)
        const absX = Math.abs(target.x - this.x)

        if (absX !== absY) return false

        const dx = this.x > target.x ? -1 : 1
        const dy = this.y > target.y ? -1 : 1

        for (let i = 1; i < absX; i++) {
            if (!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty()) {
                return false
            }
        }
        return true
    }

    isSafeMove(target: Cell) {
        const {black, white} = this.board.findKings()
        const prevCell = this
        const prevFigure = target.figure
        this.shadowMove(target, null)
        if (black?.isUnderAttack(true) && target.figure?.color === Color.BLACK || white?.isUnderAttack(true) && target.figure?.color === Color.WHITE) {
            target.shadowMove(prevCell, prevFigure)
            return false
        }
        target.shadowMove(prevCell, prevFigure)
        return true
    }

    shadowMove(target: Cell, figure: Figure | null) {
        if (this.figure) {
            target.figure = this.figure
            target.figure.cell = target
            this.figure = figure
        }
    }


    makeTurn(target: Cell) {
        if (this.figure && 
            (this.figure.canMove(target))) {
            const {black, white} = this.board.findKings()
            const customOption = this.figure.moveFigure(target)

            console.log(customOption)

            if (this.figure instanceof Pawn && customOption) {
                target = this.board.getCell(target.x, target.y - this.figure.direction)
            }

            if (target.figure) {
                if (target.figure.color === Color.BLACK) this.board.lostBlackFigures.push(target.figure)
                else this.board.lostWhiteFigures.push(target.figure)
            }
            target.figure = this.figure
            target.figure.cell = target
            this.figure = null

            this.board.blackCheck = !!black?.isUnderAttack(true)
            this.board.whiteCheck = !!white?.isUnderAttack(true)

            if (this.board.blackCheck) {
                this.board.blackCheckmate = this.board.isChekmate(Color.BLACK)
            }

            if (this.board.whiteCheck) {
                this.board.whiteCheckmate = this.board.isChekmate(Color.WHITE)
            }

            this.board.history.push(this.board.getCopy())
            console.log(this.board.history)
        }
    }

    unmakeTurn(target: Cell) {
        this.board = this.board.history[this.board.history.length-1]
    }
}
