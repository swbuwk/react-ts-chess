import React, { FC } from 'react'

interface ChekmateModalProps {
    isWhiteCheckmate: boolean;
    isBlackCheckmate: boolean;
}


const CheckmateModal: FC<ChekmateModalProps> = ({isBlackCheckmate, isWhiteCheckmate}) => {
  return (
    isWhiteCheckmate || isBlackCheckmate
    ? 
    <div className='checkmate-modal'>
      {isBlackCheckmate ? "Белые победили!" : ""}
      {isWhiteCheckmate ? "Чёрные победили!" : ""}
    </div>
    :
    <></>
  )
}

export default CheckmateModal