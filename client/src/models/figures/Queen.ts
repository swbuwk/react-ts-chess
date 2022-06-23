import { Cell } from "../Cell"
import { Color } from "../Color"
import { Figure, FigureName } from "./Figure"
import logo from "../../assets/queen.png"

export class Queen extends Figure {
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = logo
        this.name = FigureName.QUEEN
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (!super.canMove(target, safeNoMatter)) return false
        if (this.cell.checkVertical(target)) return true
        if (this.cell.checkHorizontal(target)) return true
        if (this.cell.checkDiagonal(target)) return true
        return false
    }
}