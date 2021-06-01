import React from "react";
import "./Footer.css";
export function Footer() {
  const getCurrentDate = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className='app__footer'>
      <div className='footer__items'>
        <p className='date'>
          &copy; <span>{getCurrentDate()}</span> Snubes GmbH
        </p>

        <ul>
          <li>partner1</li>
          <li>partner2</li>
          <li>partner3</li>
        </ul>
      </div>
    </footer>
  );
}
