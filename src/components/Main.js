import React from "react";
import App from './App.js'
import { useState, useEffect } from "react";
import { tokenApi } from "../utils/Api.js";
import Card from "./Card.js";

export default function Main ({onEditProfile, onAddPlace, onEditAvatar, onClickCard}) {
   const [userName, setUserName] = useState("");
   const [userDescription, setUserDescription] = useState("");
   const [userAvatar, setUserAvatar] = useState("");
   const [cards, setСards] = useState([]);

   useEffect(() => {
      Promise.all([tokenApi.getUserData(), tokenApi.getInitialCards()])
        .then(([user, card]) => {
          setUserName(user.name);
          setUserDescription(user.about);
          setUserAvatar(user.avatar);
          setСards(card);
        })
        .catch((err) => {
          console.log("ошибка карточки не пришли");
        });
    }, []);

   return (
   <>
      <main>
            <section className="profile">
               <div className="profile__info">
                  <div onClick={onEditAvatar} className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
                  <div className="profile__edit" onClick={onEditProfile}>
                     <div className="profile__row">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__redact" type="button"></button>
                     </div>
                     <p className="profile__status">{userDescription}</p>
                  </div>
               </div>
               <button onClick={onAddPlace} className="profile__button" type="button"></button>
            </section>
            <div className="elements">
                  {cards.map((card) => (
                     <Card card={card} key={card._id} onClickCard={onClickCard} />
               ))}
            </div>
    </main>
      </>
    );
}