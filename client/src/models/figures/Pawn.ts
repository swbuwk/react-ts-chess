import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureName } from "./Figure";
import logo from "../../assets/pawn.png"

export class Pawn extends Figure {
    isFirstStep: boolean
    direction: number

    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = logo
        this.name = FigureName.PAWN
        this.isFirstStep = true
        this.direction = this.color === Color.BLACK ? 1 : -1
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (!super.canMove(target, safeNoMatter)) return false


        if (target.x === this.cell.x) {
            if (
                (this.isFirstStep &&
                target.y === (this.cell.y + this.direction * 2) &&
                this.cell.board.getCell(target.x, target.y - this.direction).isEmpty() &&
                this.cell.board.getCell(target.x, target.y).isEmpty())
            ) {
                return true
            }
            if ((target.y === (this.cell.y + this.direction) &&
                this.cell.board.getCell(target.x, target.y).isEmpty())
            ) return true
        }

        if (target.y === this.cell.y + this.direction &&
            (target.x === this.cell.x + 1 ||
             target.x === this.cell.x - 1) &&
             !this.cell.board.getCell(target.x, target.y).isEmpty()) return true
        return false
    }

    moveFigure(target: Cell): boolean {
        super.moveFigure(target)

        this.isFirstStep = false

        if (this.cell.x - target.x === -1 || this.cell.x - target.x === 1) {
                return true
        }

        return false
    }
}