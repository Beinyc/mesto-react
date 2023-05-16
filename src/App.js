import logo from  './images/header/header__logo.svg'

function App() {
  return (
    <body className='page'>
      <header className='header'>
        <img src={logo} alt="логотип хедер" className="header__logo"/>
      </header>
      <main>
      <section className="profile">
               <div className="profile__info">
                  <div className="profile__avatar"></div>
                  <div className="profile__edit">
                     <div className="profile__row">
                        <h1 className="profile__name">Апатенко Никита</h1>
                        <button  className="profile__redact" type="button"></button>
                     </div>
                     <p className="profile__status">Пытающийся понять javascript</p>
                  </div>
               </div>
               <button className="profile__button" type="button"></button>
            </section>
            <section className="elements">
                     <template className="elements__template">
                        <div className="elements__card">
                           <img alt="вставьте название" className="elements__image"/>
                           <div className="elements__signature">
                              <h2 className="elements__title"></h2>
                              <div className="elements__like-box">
                                 <button className="elements__like" type="button"></button>
                                 <p className="elements__number-like">0</p>
                              </div>
                           </div>
                           <button className="elements__delete" type="button"></button>
                        </div>
                     </template>
            </section>
      </main>
      <footer className="footer">
            <h4 className="footer__text">© 2023 Mesto Russia</h4>
         </footer>
         <section className="Allpopup">
            <div className="popup popup_type_profile">
              <div class="popup__conteiner">
                <form className="form" name="form1" noValidate>
                  <input type="text" placeholder="Имя" value="Никита Апатенко" className="popup__input" name="form__name" id="name-input" minlength="2" maxlength="40" required/>
                    <span className="form__input-error name-input-error"></span>
                    <input type="text" placeholder="О себе" value="Пытающийся понять код" className="popup__input popup__about-me" name="form__status" id="status-input" minlength="2" maxlength="200" required/>
                    <span className="form__input-error status-input-error"></span>
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button className="popup__close" type="button"></button>
              </div>
            </div>
            <div className="popup popup_type_card">
            <div className="popup__conteiner">
               <h3 className="popup__title">Новое место</h3>
               <form name="form2" className="form" novalidate>
                  <input type="text" value="" placeholder="Название" className="popup__input" name="form__name" id="card-input" minlength="2" maxlength="30" required/>
                  <span className="form__input-error card-input-error"></span>
                  <input type="url" value="" placeholder="Ссылка на картину" className="popup__input popup__about-me" name="form__status" id="url-input" required/>
                  <span className="form__input-error url-input-error"></span>
                  <button className="popup__button" type="submit">Создать</button>
               </form>
               <button className="popup__close" type="button"></button>
            </div>
         </div>
         <div className="popup popup_type_image">
            <div className="popup__images">
            <img className="popup__image" src="https://images.unsplash.com/photo-1666096968009-f8b7bdd51ba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="картинка"/>
            <h3 className="popup__description">Великолепный лес</h3>
            <button type="button" className="popup__close"></button>
            </div>
         </div>
         <div className="popup popup_type_confirmation">
            <div className="popup__conteiner-confirmation">
               <h3 className="popup__title-confirmation">Вы уверены?</h3>
               <button className="popup__button popup__button-confirmation" type="submit">Да</button>
               <button className="popup__close" type="button"></button>
            </div>
         </div>
         <div className="popup popup_type_avatar">
            <div className="popup__conteiner popup__container-avatar">
               <h3 className="popup__title">Обновить аватар</h3>
               <form name="form3" className="form" novalidate>
                  <input type="url" value="" placeholder="Ссылка" className="popup__input" name="form__name" id="avatar-input" minlength="2" required/>
                  <span className="form__input-error avatar-input-error"></span>
                  <button className="popup__button" type="submit">Сохранить</button>
               </form>
               <button className="popup__close" type="button"></button>
            </div>
         </div>
         </section>
    </body>
  );
}

export default App;
