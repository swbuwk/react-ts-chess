import { Figure, FigureName } from "./Figure";
import logo from "../../assets/bishop.png"
import { Color } from "../Color";
import { Cell } from "../Cell";

export class Bishop extends Figure {
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = logo
        this.name = FigureName.BISHOP
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (!super.canMove(target, safeNoMatter)) return false
        if (this.cell.checkDiagonal(target)) return true
        return false
    }
}