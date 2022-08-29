import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log(card);
    setIsLiked(
      card.likes.some((userIdIsLiked) => userIdIsLiked === currentUser._id)
    );
  }, [card.likes, setIsLiked, currentUser._id]);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `elements__delete ${
    isOwn ? "elements__delete" : "elements__delete_hidden"
  }`;

  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : "elements__like"
  }`;

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
          <button
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <p className="elements__like-counter">{card.likes?.length}</p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
      </div>
    </li>
  );
}

export default Card;
