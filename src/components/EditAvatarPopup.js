import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

export default function EditAvatarPopup ({
    isOpen, 
    onClose,
    onUpdateAvatar,
    onLoading,
}){

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, []);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({ avatar: avatarRef.current.value });
  }

    return(
        <PopupWithForm 
            isOpen={isOpen} 
            onClose={onClose} 
            popupTitle={"Обновить аватар"} 
            textButton={onLoading ? "Сохранение..." : "Сохранить"}
            onSubmit={handleSubmit}
        >    
        <input
            ref={avatarRef}
            type="url" 
            placeholder="Ссылка" 
            class="popup__input" 
            name="form__name" 
            id="avatar-input" 
            minlength="2" 
            required
        />
        <span class="form__input-error avatar-input-error"></span>
      </PopupWithForm>
    );
}