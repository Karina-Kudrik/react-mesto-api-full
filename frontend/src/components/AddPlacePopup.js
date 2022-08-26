import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup({isOpen, onClose, onAddCard, isLoading}) {

   const currentUser = useContext(CurrentUserContext);

   const [place, setPlace] = useState('');
   const [link, setLink]= useState('');

   useEffect(() => {
      setPlace('');
      setLink('');
   }, [currentUser, isOpen]);

   function handleCardPlace(e) {
      setPlace(e.target.value);
   }

   function handleCardLink(e) {
      setLink(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onAddCard({
         name: place,
         link: link
      })
   }

   return (
      <PopupWithForm
         name='card-add'
         title='Новое место'
         isOpen={isOpen}
         onClose={onClose}
         onAddCard={onAddCard}
         onSubmit={handleSubmit}
         isLoading={isLoading}
         buttonText='Сохранить'
         loadingText='Сохранение...'
         >
         <input 
            type="text" 
            id="place" 
            name="name" 
            className="popup__input popup__input_type_place" 
            minLength="2" 
            maxLength="30" 
            placeholder="Название" 
            required
            value={place || ""}
            onChange={handleCardPlace}
         />

            <span className="popup__error" id="place-error"></span>

         <input 
            type="url" 
            id="link" 
            name="link" 
            className="popup__input popup__input_type_link" 
            placeholder="Ссылка на картинку" 
            required
            value={link || ""}
            onChange={handleCardLink}
         />

            <span className="popup__error" id="link-error"></span>
      </PopupWithForm>
   )
}

export default AddPlacePopup