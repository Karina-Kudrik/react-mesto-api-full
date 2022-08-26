function ImagePopup({card, onClose}) {
   return (
      <div className={`popup popup_type_card-preview ${card && "popup_opened"}`}>
         <div className="popup__wrapper">
            <img className="popup__image" src={card?.link}  alt={card?.name}/>
            <h2 className="popup__caption">{card ? card.name : ""}</h2>
            <button 
               type="reset" 
               className="popup__button popup__button_type_close" 
               onClick={onClose} 
               aria-label="Закрыть модальное окно">
            </button>
         </div>
      </div>
   )
}

export default ImagePopup