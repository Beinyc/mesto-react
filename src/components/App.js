import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { useState } from 'react';
import ImagePopup from './ImagePopup.js'
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { tokenApi } from "../utils/Api.js";
import { useEffect } from 'react';



export default function App({}) {

   const [editProfilePopup, setEditProfilePopup] = useState(false);
   const [addCardPopup, setAddCardPopup] = useState(false);
   const [editAvatarPopup, setEditAvatarPopup] = useState(false);
   const [zoomCard, setZoomCard] = useState(null);
   const [currentUser, setCurrentUser ] = useState({});
   const [cards, setCards ] = useState([])

   // useEffect(() => {
   //    Promise.all([tokenApi.getInitialCards()])
   //    .then(([card]) => {
   //       setCards(card);
   //    })
   //    .catch((err) => {console.log(`Возникла глобальная ошибка, ${err}`)})
   // }, [])

   // получаем данные аватара и профиля с сервера
   useEffect(() => {
      tokenApi
       .getUserData()
       .then((data) => {
         setCurrentUser(data)
       })
       .catch((err) => console.log(err));
   }, []);

   // //Получение карточек
   useEffect(() => {
      tokenApi
         .getInitialCards(cards)
         .then((card) => {
            setCards(
               card.map((item) => ({
                  link: item.link,
                  name: item.name,
                  cardId: item._id,
                  likes: item.likes,
               }))
            );
         })
         .catch((err) => {console.log(`Возникла глобальная ошибка , ${err}`)})
   }, []);

   function handleEditProfileClick(){
      setEditProfilePopup(true)
   };

   function handleAddPlaceClick(){
      setAddCardPopup(true);
   };

   function handleEditAvatarClick(){
      setEditAvatarPopup(true)
   };

   function closePopupAll () {
      setEditProfilePopup(false);
      setAddCardPopup(false);
      setEditAvatarPopup(false);
      setZoomCard(null);
   }

   function handleCardClick(card) {
      setZoomCard(card);
    }

   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className='page'>
      <Header/>
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onClickCard={handleCardClick} cards={cards}/>
      <PopupWithForm isOpen={editProfilePopup} onClose={closePopupAll} popupTitle={"Редактировать профиль"} textButton={"Сохранить"}>
            <input type="text" placeholder="Имя" value="" class="popup__input" name="form__name" id="name-input" minlength="2" maxlength="40" required/>
            <span class="form__input-error name-input-error"></span>
            <input type="text" placeholder="О себе" value="" class="popup__input popup__about-me" name="form__status" id="status-input" minlength="2" maxlength="200" required/>
            <span class="form__input-error status-input-error"></span>
      </PopupWithForm>
      <PopupWithForm isOpen={addCardPopup} onClose={closePopupAll} popupTitle={"Новое место"} textButton={"Создать"}>
            <input type="text" value="" placeholder="Название" class="popup__input" name="form__name" id="card-input" minlength="2" maxlength="30" required/>
            <span class="form__input-error card-input-error"></span>
            <input type="url" value="" placeholder="Ссылка на картину" class="popup__input popup__about-me" name="form__status" id="url-input" required/>
            <span class="form__input-error url-input-error"></span>
      </PopupWithForm>
      <PopupWithForm isOpen={editAvatarPopup} onClose={closePopupAll} popupTitle={"Обновить аватар"} textButton={"Сохранить"}>
               <input type="url" value="" placeholder="Ссылка" class="popup__input" name="form__name" id="avatar-input" minlength="2" required/>
               <span class="form__input-error avatar-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={zoomCard} onClose={closePopupAll}/>

      <Footer/>
            </div>
      </CurrentUserContext.Provider>
  );
}
