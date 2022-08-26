import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

   const currentUser = useContext(CurrentUserContext);

   return (
      <main className="content">
         <section className="profile">

            <div className="profile__image-container">
               <img 
                  onClick={onEditAvatar} 
                  className="profile__avatar" 
                  src={currentUser.avatar}
                  alt="Пользователь"
               />
            </div>

            <div className="profile__info">
               <div className="profile__info-edit">
                  <h1 className="profile__name">{currentUser.name}</h1>
                     <button 
                        onClick={onEditProfile} 
                        className="profile__button profile__button_type_edit" 
                        type="button" 
                        aria-label="Редактировать профиль">
                     </button>
               </div>
                  <p className="profile__description">{currentUser.about}</p>
            </div>
               <button 
                  onClick={onAddPlace} 
                  className="profile__button profile__button_type_add" 
                  type="button" 
                  aria-label="Добавить">
               </button>

         </section>

         <section className="elements">
            <ul className="elements__container" id="container" name="container">
               {cards.map((card) => (
                  <Card key={card._id} 
                        card={card} 
                        onCardClick={onCardClick} 
                        onCardLike={onCardLike} 
                        onCardDelete={onCardDelete}
                  />
               ))}
            </ul>
         </section>

      </main>
   )
}

export default Main