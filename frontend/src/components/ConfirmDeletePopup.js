import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpen, onClose, card, onDeleteClick, isLoading}) {

   function handleDelete(e) {
      e.preventDefault();
      onDeleteClick(card);
   }

   return (
      <PopupWithForm
         name='confirm'
         title='Вы уверены?'
         onClose={onClose}
         isOpen={isOpen}
         onSubmit={handleDelete}
         onDeleteClick={onDeleteClick}
         isLoading={isLoading}
         buttonText='Да'
         loadingText='Удаление...'
      />
   )
}

export default ConfirmDeletePopup