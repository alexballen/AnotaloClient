import { useState } from "react";
import { useSelector } from "react-redux";
import { handleHover, handleMouseLeave } from "../services/services";
import { FaUserLarge } from "react-icons/fa6";
import s from "./NavBar.module.css";

const NavBar = () => {
  const { token } = useSelector((state) => state.token);

  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredNote, setIsHoveredNote] = useState(false);

  return (
    <main>
      <div className={s.container}>
        <section>
          <nav>
            <div className={s.nav_container}>
              <section>
                <div className={s.nav_der_container}>
                  <div className={s.home_container}>
                    <div className={s.line1}>
                      <a
                        className={s.nav_link}
                        href="/"
                        onMouseEnter={() => handleHover(setIsHoveredHome)}
                        onMouseLeave={() => handleMouseLeave(setIsHoveredHome)}
                      >
                        Inicio
                      </a>
                    </div>
                    <div className={s.line2}></div>
                    <div
                      className={`${s.line3} ${isHoveredHome ? s.rotated : ""}`}
                    ></div>
                  </div>
                  <div className={s.notes_container}>
                    <div className={s.line1}>
                      <a
                        className={s.nav_link}
                        href="/notes"
                        onMouseEnter={() => handleHover(setIsHoveredNote)}
                        onMouseLeave={() => handleMouseLeave(setIsHoveredNote)}
                      >
                        Notas
                      </a>
                    </div>
                    <div className={s.line2}></div>
                    <div
                      className={`${s.line3} ${isHoveredNote ? s.rotated : ""}`}
                    ></div>
                  </div>
                </div>
              </section>
              <section>
                <div className={s.dropdown}>
                  <button className={s.dropbtn}>
                    <FaUserLarge />
                  </button>
                  <div className={s.dropdown_content}>
                    {token && Object.keys(token).length > 0 ? (
                      <div className={s.logout_container}>
                        <a className={s.nav_link_sesion} href="/logout">
                          Cerrar Sesión
                        </a>
                      </div>
                    ) : (
                      <>
                        {!Object.keys(token).length > 0 && (
                          <div className={s.signin_container}>
                            <a className={s.nav_link_sesion} href="/signin">
                              Inicio Sesión
                            </a>
                          </div>
                        )}
                        {!Object.keys(token).length > 0 && (
                          <div className={s.signin_container}>
                            <a className={s.nav_link_sesion} href="/signup">
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
          </nav>
        </section>
      </div>
    </main>
  );
};

export default NavBar;
