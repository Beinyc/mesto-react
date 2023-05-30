import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card ({ card, onClickCard, onLikeCrad }) {

  const currentUser = React.useContext(CurrentUserContext);
  
  //Проверяем являюсь ли я владельцем карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? 'elements__delete_inactive' : ''}`
  );
  //Проверяем стоит ли мой лайк
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active ' : ''}`
  );

      function handleCardClick(){
         onClickCard(card);
      }

      function handleCardLike(){
         onLikeCrad(card);
      }

    return (
         <div className="elements__card">
          <img alt={card} src={card.link} onClick={handleCardClick} className="elements__image"/>
             <div className="elements__signature">
                 <h2 className="elements__title">{card.name}</h2>
                  <div className="elements__like-box">
                  <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button"></button>
                  <p className="elements__number-like">{card.likes.length}</p>
             </div>
           </div>
           {isOwn && <button className={cardDeleteButtonClassName} type="button"/>}
          </div>               
    );
}