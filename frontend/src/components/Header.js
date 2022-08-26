import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo_mesto.svg';

function Header({email, onSignOut}) {
   return (
      <header className="header">
         <img className="header__logo" src={logo} alt="Место"/>
         <Switch>
            <Route exact path="/sign-in">
               <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Route>
            <Route exact path="/sign-up">
               <Link to="/sign-in" className="header__link">Войти</Link>
            </Route>
            <Route exact path="/">
               <div className="header__menu">
               <p className="header__user-email">{email}</p>
               <Link to="/sign-in" className="header__link header__link_grey" onClick={onSignOut}>Выйти</Link>
               </div>
            </Route>
         </Switch>
      </header>
   )
}

export default Header