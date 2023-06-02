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
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';



export default function App({ }) {

  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const [addCardPopup, setAddCardPopup] = useState(false);
  const [editAvatarPopup, setEditAvatarPopup] = useState(false);
  const [zoomCard, setZoomCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // получаем данные аватара и профиля с сервера
  useEffect(() => {
    tokenApi
      .getUserData()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, []);

  //Получение карточек
  useEffect(() => {
    tokenApi
      .getInitialCards(cards)
      .then((card) => {
        setCards(
          card.map((card) => ({
            link: card.link,
            name: card.name,
            likes: card.likes,
            _id: card._id,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => { console.log(`Возникла глобальная ошибка , ${err}`) })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((card) => card._id === currentUser._id)

    if (isLiked) {
      tokenApi
        .deleteLikeCard(card._id)
        .then((card) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? card : item))
          )
        )
        .catch((error) => console.log`(Ошибка: ${error})`)
    } else {
      tokenApi
        .cardLike(card._id)
        .then((card) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? card : item))
          )
        )
        .catch((error) => console.log`(Ошибка: ${error})`)
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true)
  };

  function handleAddPlaceClick() {
    setAddCardPopup(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopup(true)
  };

  function closePopupAll() {
    setEditProfilePopup(false);
    setAddCardPopup(false);
    setEditAvatarPopup(false);
    setZoomCard(null);
  }

  function handleCardClick(card) {
    setZoomCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    tokenApi
      .deleteCard(card._id)
      .then((res) => {
        setCards((cardsArray) =>
          cardsArray.filter((item) => item._id !== card._id)
        );
      })
      .catch((error) => console.log`(Ошибка: ${error})`)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    tokenApi
      .editProfile({
        name: name,
        about: about,
      })
      .then((res) => {
        setCurrentUser(res);
        closePopupAll();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    tokenApi
      .updateAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closePopupAll();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при изменении аватара, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(data) {
    tokenApi
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopupAll();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при добавлении карточки, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handlerEsc = (evt) => {
    evt.key === 'Escape' && closePopupAll();
  };

  useEffect(() => {
    document.addEventListener('keydown', handlerEsc);
    return () => {
      document.removeEventListener('keydown', handlerEsc);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClickCard={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={editProfilePopup}
          onClose={closePopupAll}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={addCardPopup}
          onClose={closePopupAll}
          onAddPlace={handleAddPlace}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={editAvatarPopup}
          onClose={closePopupAll}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <ImagePopup
          card={zoomCard}
          onClose={closePopupAll} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
