function Footer() {

   const today = new Date();
   const year = today.getFullYear();

   return (
      <footer className="footer">
         <div className="footer__container">
            <p className="footer__copyright">&copy; {year} Mesto Russia</p>
         </div>
      </footer>
   )
}

export default Footer