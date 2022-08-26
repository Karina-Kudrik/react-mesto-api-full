import successful from '../images/Union-successfully.svg';
import failed from '../images/Union-unsuccessfully.svg';

function InfoToolTip({isOpen, onClose, isAuthComplete}) {
   return (
      <div className={`popup ${isOpen && "popup_opened"}`}>
         <div className="popup__register-container">
            { <>
               <img 
                  className="popup__register-icon" 
                  src={ isAuthComplete ? successful : failed } 
                  alt="Регистрация"
               />
               <h2 className="popup__notification">
                  { isAuthComplete ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так!Попробуйте еще раз' }
               </h2>
               </>
            }
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

export default InfoToolTip