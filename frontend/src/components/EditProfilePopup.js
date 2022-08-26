import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import useFormAndValidation from "../hooks/useFormAndValidation";


function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

//   const { values, errors, isValid, resetForm} = useFormAndValidation();

   const currentUser = useContext(CurrentUserContext);

   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
      //resetForm();
   }, [currentUser, isOpen]);

   function handleUserName(e) {
      setName(e.target.value);
   }

   function handleUserDescription(e) {
      setDescription(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
         name: name,
         about: description,
      });
   }

   return (
      <PopupWithForm
         name='profile-edit'
         title='Редактировать профиль'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
         isLoading={isLoading}
         buttonText='Сохранить'
         loadingText='Сохранение...'
         >
         <input 
            type="text" 
            id="name"  
            name="name" 
            className="popup__input popup__input_type_name" 
            minLength="2" 
            maxLength="40" 
            placeholder="Имя" 
            required
            onChange={handleUserName}
            value={name || ""}
         />

            <span className="popup__error" id="name-error"></span>

         <input 
            type="text" 
            id="about" 
            name="about" 
            className="popup__input popup__input_type_about" 
            minLength="2" 
            maxLength="200" 
            placeholder="О себе" 
            required
            onChange={handleUserDescription}
            value={description || ""}
         />

            <span className="popup__error" id="about-error"></span>

      </PopupWithForm>
   )
}

export default EditProfilePopup