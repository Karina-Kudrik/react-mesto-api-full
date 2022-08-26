import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

   const avatar = useRef();

   useEffect(() => {
      avatar.current.value = ''
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar({
         avatar: avatar.current.value
      });
   }

   return (
      <PopupWithForm
         name='avatar-edit'
         title='Обновить аватар'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
         isLoading={isLoading}
         buttonText='Сохранить'
         loadingText='Сохранение...'
         >
         <input 
            type="url" 
            id="avatar" 
            name="avatar" 
            className="popup__input popup__input_type_url" 
            placeholder="Ссылка на изображение" 
            required
            ref={avatar}
         />

            <span className="popup__error" id="avatar-error"></span>

         </PopupWithForm>
   )
}

export default EditAvatarPopup