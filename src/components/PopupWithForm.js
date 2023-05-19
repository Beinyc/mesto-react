export default function PopupWithForm ({name, isOpen, popupTitle, children, textButton, onClose}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className={`popup__conteiner popup__conteiner_${name}`}>
               <h3 className="popup__title">{popupTitle}</h3>
                    <form className="form" name={`form-popup-${name}`}>
                                {children}
                            <button className="popup__button" type="submit">
                                {textButton}
                            </button>
                    </form>
               <button onClick={onClose} className="popup__close" type="button"></button>
            </div>
        </div>
    );
}