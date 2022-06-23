import { Color } from "../Color";
import logo from "../../assets/king.png"
import { Cell } from "../Cell";

export enum FigureName {
    FIGURE = "Фигура",
    KING = "Король",
    QUEEN = "Ферзь",
    BISHOP = "Слон",
    KNIGHT = "Конь",
    ROOK = "Ладья",
    PAWN = "Пешка"
}

export class Figure {
    color: Color;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureName;
    id: number;

    constructor (color: Color, cell: Cell) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = logo
        this.name = FigureName.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell, safeNoMatter: boolean = false): boolean {
        if (target.figure?.color === this.color) return false
        if (!safeNoMatter) {
            if (!this.cell.isSafeMove(target)) return false
        }

        return true
    }

    isUnderAttack(safeNoMatter: boolean = false): boolean {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = this.cell.board.cells[i][j]
                if (cell?.figure?.canMove(this.cell, safeNoMatter)) return true
            }
        }
        return false
    }

    moveFigure(target: Cell): boolean {
        return true
    }
}