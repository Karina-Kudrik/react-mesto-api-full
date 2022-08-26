import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({handleRegister}) => {

   const [data, setData] = useState({
      password: '', 
      email: '',
      message: ''
   });
   
   const handleChange = (e) => {
      const {name, value} = e.target;
      setData((oldData) => ({
         ...oldData,
         [name]: value
      }));
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      let {password, email} = data;
      handleRegister(password, email);
   }

   return (
      <section className="autorization">
      <div className="autorization__container">
         <p className="autorization__title">Регистрация</p>
         <form className="autorization__form" onSubmit={handleSubmit}>
            <input 
               className="autorization__input"
               id="email" 
               name="email" 
               type="email" 
               placeholder="Email"
               value={data.email || ''}
               onChange={handleChange}
               autoComplete="off"
            />
            <input 
               className="autorization__input"
               id="password" 
               name="password" 
               type="password"
               placeholder="Пароль" 
               value={data.password || ''}
               onChange={handleChange}
               autoComplete="off"
            />
         <div className="autorization__button-container">
            <button 
               type="submit"
               className="autorization__button">Зарегистрироваться</button>
         </div>
         <div className="autorization__signin">
            <p className="autorization__subtitle">Уже зарегистрированы?
            <Link to="/sign-in" className="autorization__login-link">&nbsp;Войти</Link>
            </p>
         </div>
         </form>
      </div>
      </section>
   )
}

export default Register