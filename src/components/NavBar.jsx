import { useState } from "react";
import { useSelector } from "react-redux";
import { handleHover, handleMouseLeave } from "../services/services";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineMenu, AiOutlineMenuUnfold } from "react-icons/ai";
import s from "./NavBar.module.css";

const NavBar = () => {
  const { token } = useSelector((state) => state.token);

  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredNote, setIsHoveredNote] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <div className={s.container}>
        <nav>
          <div className={s.nav__container}>
            <section>
              <figure>
                <div className={s.hamburguer__menu} onClick={toggleMenu}>
                  {isOpen ? (
                    <AiOutlineMenuUnfold className={s.menu__open} />
                  ) : (
                    <AiOutlineMenu className={s.menu__close} />
                  )}
                </div>
              </figure>
            </section>
            <div
              className={`${s.items__menu__container} ${isOpen ? s.show : ""}`}
            >
              <section>
                <div className={s.nav__der__container}>
                  <div className={s.home__container}>
                    <div className={s.line1}>
                      <a
                        className={s.nav__link}
                        href="/"
                        onMouseEnter={() => handleHover(setIsHoveredHome)}
                        onMouseLeave={() => handleMouseLeave(setIsHoveredHome)}
                      >
                        Inicio
                      </a>
                    </div>
                    <div className={s.line2}></div>
                    <div
                      className={`${s.line3} ${isHoveredHome ? s.rotate : ""}`}
                    ></div>
                  </div>
                  <div className={s.notes__container}>
                    <div className={s.line1}>
                      <a
                        className={s.nav__link}
                        href="/notes"
                        onMouseEnter={() => handleHover(setIsHoveredNote)}
                        onMouseLeave={() => handleMouseLeave(setIsHoveredNote)}
                      >
                        Notas
                      </a>
                    </div>
                    <div className={s.line2}></div>
                    <div
                      className={`${s.line3} ${isHoveredNote ? s.rotate : ""}`}
                    ></div>
                  </div>
                </div>
              </section>
              <section>
                <div className={s.dropdown__container}>
                  <button className={s.dropbtn}>
                    <FaUserLarge className={s.FaUserLarge} />
                  </button>
                  <div className={s.linedrop}></div>
                  <div className={s.dropdown__content}>
                    {token && Object.keys(token).length > 0 ? (
                      <div className={s.logout__container}>
                        <a className={s.nav__link__sesion} href="/logout">
                          Cerrar Sesión
                        </a>
                      </div>
                    ) : (
                      <>
                        {!Object.keys(token).length > 0 && (
                          <div className={s.signin__signup__container}>
                            <a className={s.nav__link__sesion} href="/signin">
                              Iniciar Sesión
                            </a>
                          </div>
                        )}
                        {!Object.keys(token).length > 0 && (
                          <div className={s.signin__signup__container}>
                            <a className={s.nav__link__sesion} href="/signup">
                              Registrarse
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
};

export default NavBar;
