import React from "react";
import ProtectedRoute from "./ProtectedRoute.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { api } from "../utils/Api";
import * as auth from "../utils/auth.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../index.css";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatartPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoToolTip from "./InfoTooltip.js";
import Register from "./Register.js";
import Login from "./Login.js";

function App() {
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
   const [isInfoTooltip, setIsInfoTooltipOpen] = useState({
      opened: false,
      isAuthComplete: false,
   });

   const [cards, setCards] = useState([]);
   const [selectedCard, setSelectedCard] = useState(null);
   const [removeCard, setRemoveCard] = useState(null);

   const [isLoading, setIsLoading] = useState(false);

   const [currentUser, setCurrentUser] = useState({});

   const [loggedIn, setLoggedIn] = useState(false);
   const [email, setEmail] = useState("");

   const history = useHistory();

   useEffect(() => {
      checkToken();
   }, []);

   useEffect(() => {
      if (loggedIn) {
         api
         .getUserInfo()
         .then((res) => setCurrentUser(res.data))
         .catch((err) => console.log(err));

         api
         .getInitialCards()
         .then((res) => {
            setCards(res.data);
         })
         .catch((err) => console.log(err));
      }
   }, [loggedIn]);

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   }

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   }

   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
   }

   function handleConfirmDeleteClick(card) {
      setIsConfirmDeletePopupOpen(true);
      setRemoveCard(card);
   }

   function handleCardClick(card) {
      setSelectedCard(card);
   }

   function handleCardLike(card) {
      const isLiked = card.likes.some(
         (userIdIsLiked) => userIdIsLiked === currentUser._id
      );
      console.log(isLiked);

      api
         .changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
         console.log(newCard);
         setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
         );
         })
         .catch((err) => console.log(err));
   }

   function handleCardDelete(card) {
      setIsLoading(true);
      api
         .deleteCard(card._id)
         .then(() => {
         setCards((state) => state.filter((c) => c._id !== card._id && c));
         closeAllPopups();
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }

   function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(null);
      setIsConfirmDeletePopupOpen(false);
      setIsInfoTooltipOpen(false);
   }

   const isOpen =
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
      isConfirmDeletePopupOpen ||
      isInfoTooltip;

   useEffect(() => {
      function closeByEscape(evt) {
         if (evt.key === "Escape") {
         closeAllPopups();
         }
      }
      if (isOpen) {
         document.addEventListener("keydown", closeByEscape);
         return () => {
         document.removeEventListener("keydown", closeByEscape);
         };
      }
   }, [isOpen]);

   function handleUpdateUser(data) {
      setIsLoading(true);
      api
         .setUserInfo(data)
         .then((res) => {
         setCurrentUser(res.data);
         closeAllPopups();
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }

   function handleUserAvatar(data) {
      setIsLoading(true);
      api
         .setUserAvatar(data)
         .then((res) => {
         setCurrentUser(res.data);
         closeAllPopups();
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }

   function handleAddCard(data) {
      setIsLoading(true);
      api
         .addCard(data)
         .then((res) => {
         setCards([res.data, ...cards]);
         closeAllPopups();
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }

   function handleRegister(password, email) {
      auth
         .register(password, email)
         .then((res) => {
         console.log(res);
         if (res) {
            setIsInfoTooltipOpen({
               opened: true,
               isAuthComplete: true,
            });
            history.push("/");
         }
         })
         .catch((err) => {
            console.log(err);
            setIsInfoTooltipOpen({
               opened: true,
               isAuthComplete: false,
            });
         })
   }

   function handleLogin(password, email) {
      auth
         .autorize(password, email)
         .then((res) => {
         if (res.token) {
            localStorage.setItem("jwt", res.token);
            setLoggedIn(true);
            setEmail(email);
            history.push("/");

            api
               .getUserInfo()
               .then((res) => setCurrentUser(res.data))
               .catch((err) => console.log(err));
         }
         })
         .catch((err) => {
            console.log(err);
            setIsInfoTooltipOpen({
               opened: true,
               isAuthComplete: false,
            });
         });
   }

   function checkToken() {
      let token = localStorage.getItem("jwt");
      if (token) {
         auth
         .getContent(token)
         .then((res) => {
            setLoggedIn(true);
            setCurrentUser(res.data);
            setEmail(res.data.email);
            history.push("/");
         })
         .catch((err) => console.log(err));
      }
   }

   function handleSignOut() {
      localStorage.clear();
      setLoggedIn(false);
      setCurrentUser('');
      history.push("/sign-in");
   }

   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="page">
         <Header email={email} onSignOut={handleSignOut} />
         <Switch>
            <Route exact path="/sign-up">
               <Register handleRegister={handleRegister} />
            </Route>
            <Route exact path="/sign-in">
               <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute
               exact
               path="/"
               component={Main}
               onEditProfile={handleEditProfileClick}
               onAddPlace={handleAddPlaceClick}
               onEditAvatar={handleEditAvatarClick}
               onCardClick={handleCardClick}
               onCardLike={handleCardLike}
               onCardDelete={handleConfirmDeleteClick}
               onClose={closeAllPopups}
               cards={cards}
               loggedIn={loggedIn}
            />
            <Route path="*">
               {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
         </Switch>
         <Footer />
         </div>

         <EditProfilePopup
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}
         onUpdateUser={handleUpdateUser}
         isLoading={isLoading}
         />

         <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUserAvatar}
         isLoading={isLoading}
         />

         <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onClose={closeAllPopups}
         onAddCard={handleAddCard}
         isLoading={isLoading}
         />

         <ConfirmDeletePopup
         isOpen={isConfirmDeletePopupOpen}
         onClose={closeAllPopups}
         onDeleteClick={handleCardDelete}
         card={removeCard}
         isLoading={isLoading}
         />

         <ImagePopup onClose={closeAllPopups} card={selectedCard} />

         <InfoToolTip 
         isOpen={isInfoTooltip.opened} 
         onClose={closeAllPopups} 
         isAuthComplete={isInfoTooltip.isAuthComplete}
         />
      </CurrentUserContext.Provider>
   );
}

export default App;