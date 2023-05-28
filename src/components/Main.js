import React from "react";
import App from './App.js'
import { useState, useEffect } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from "../contexts/CurrentCardContext.js";

export default function Main ({onEditProfile, onAddPlace, onEditAvatar, onClickCard}) {

   const currentUser = React.useContext(CurrentUserContext);
   const currentCard = React.useContext(CurrentCardContext);
   const [cards, setCards] = useState([])

   return (
   <>
      <main>
            <section className="profile">
               <div className="profile__info">
                  <div onClick={onEditAvatar} className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                  <div className="profile__edit" onClick={onEditProfile}>
                     <div className="profile__row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__redact" type="button"></button>
                     </div>
                     <p className="profile__status">{currentUser.about}</p>
                  </div>
               </div>
               <button onClick={onAddPlace} className="profile__button" type="button"></button>
            </section>
            <div className="elements">
                  {cards && 
                     cards.map((item) => {
                        <Card item={currentCard.card} key={currentCard.card.id} onClickCard={onClickCard} />
                     })}
                  {/* {currentCard.map((card) => (
                     <Card card={card} key={card.id} onClickCard={onClickCard} />
               ))} */}
            </div>
      </main>
      </>
    );
}