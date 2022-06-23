import { Cell } from "../Cell";
import { Color } from "../Color";
import { Figure, FigureName } from "./Figure";
import logo from "../../assets/king.png"

export class King extends Figure {
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = logo
        this.name = FigureName.KING
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (!super.canMove(target, safeNoMatter)) return false

        const absY = Math.abs(target.y - this.cell.y)
        const absX = Math.abs(target.x - this.cell.x)

        if (absX <= 1 && absY <= 1) return true

        return false
    }
}