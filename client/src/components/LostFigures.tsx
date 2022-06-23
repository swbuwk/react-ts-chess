import React, { FC } from 'react'
import { Color } from '../models/Color'
import { Figure } from '../models/figures/Figure'

interface lostFiguresProps {
    figures: Figure[]
    title: string
}

const LostFigures: FC<lostFiguresProps> = ({figures, title}) => {
  return (
    <div className="lost">
      <span>{title}</span>
        {figures.map(figure => 
            <div key={figure.id} className={figure.color === Color.BLACK ? "black-figure" : "white-figure"}>{figure.logo && <img src={figure.logo}></img>}</div>
            )}
    </div>
  )
}

export default LostFigures