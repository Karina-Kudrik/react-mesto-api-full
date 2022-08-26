import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

   const currentUser = useContext(CurrentUserContext);

   const handleClick = () => {
      onCardClick(card);
   }
   const handleCardLike = () => {
      onCardLike(card);
   }

   const handleCardDelete = () => {
      onCardDelete(card);
   }
   const isOwn = card.owner._id === currentUser._id;
   const cardDeleteButtonClassName = (
      `elements__delete ${isOwn ? 'elements__delete' : 'elements__delete_hidden'}`
   ); 

   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = (
      `elements__like ${isLiked ? 'elements__like_active' : 'elements__like'}`);

   return (
      <li className="elements__card">
         <img 
            className="elements__item" 
            src={card.link} 
            alt={card.name} 
            onClick={handleClick}
         />
            <div className="elements__figcaption">
               <h3 className="elements__card-heading">{card.name}</h3>
            <div className="elements__counter">
               <button className={cardLikeButtonClassName} onClick={handleCardLike}></button>
               <p className="elements__like-counter">{card.likes.length}</p>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
         </div>
      </li>
   )
}

export default Card