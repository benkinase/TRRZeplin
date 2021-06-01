import { useState } from "react";
import "./Header.css";
import snubes from "../../utilities/SVG/snubes.svg";

export const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleShowLinks = () => setOpen(!isOpen);

  return (
    <header>
      <div className='navbar'>
        <div className='navbar__mobile'>
          <div className='logo'>
            <img src={snubes} alt='snubes logo' />
          </div>
          <button className='toggle__btn' onClick={() => toggleShowLinks()}>
            <div className='bar' id='bar'></div>
          </button>
        </div>

        <div className={isOpen ? `nav__links show__hidden` : `nav__links`}>
          <div className='main__links'>
            <div className='nav__item'>
              <a href='/about' className='nav__link'>
                about us
              </a>
            </div>
            <div className='nav__item'>
              <a href='/partners' className='nav__link'>
                partners
              </a>
            </div>
            <div className='nav__item'>
              <a href='/clients' className='nav__link'>
                clients
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
