import React from 'react';
import { CurrentCardContext } from '../contexts/CurrentCardContext';

export default function Card ({ card, onClickCard}) {

      const currentCard = React.useContext(CurrentCardContext);

      function handleCardClick(){
         onClickCard(card)
      }
    return (
         <div className="elements__card">
          <img alt={currentCard.name} src={currentCard.link} onClick={handleCardClick} className="elements__image"/>
             <div className="elements__signature">
                 <h2 className="elements__title">{currentCard.name}</h2>
                  <div className="elements__like-box">
                  <button className="elements__like" type="button"></button>
                  <p className="elements__number-like">{currentCard.likes.length}</p>
             </div>
           </div>
               <button className="elements__delete" type="button"></button>
          </div>               
    );
}