import { Cell } from "../Cell"
import { Color } from "../Color"
import { Figure, FigureName } from "./Figure"
import logo from "../../assets/knight.png"

export class Knight extends Figure {
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = logo
        this.name = FigureName.KNIGHT
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (!super.canMove(target, safeNoMatter)) return false

        const absY = Math.abs(target.y - this.cell.y)
        const absX = Math.abs(target.x - this.cell.x)

        if (absX + absY === 3 && absX !== 0 && absY !== 0) return true

        return false
    }
}