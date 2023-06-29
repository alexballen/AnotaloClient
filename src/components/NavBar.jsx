import { useSelector } from "react-redux";
import s from "./NavBar.module.css";

const NavBar = () => {
  const { token } = useSelector((state) => state.token);

  return (
    <main>
      <div className={s.container}>
        <section>
          <nav>
            <div className={s.nav_container}>
              <section>
                <div className={s.nav_der_container}>
                  <div className={`${s.home_container} `}>
                    <a className={s.nav_link} href="/">
                      Inicio
                    </a>
                  </div>
                  <div className={`${s.notes_container} `}>
                    <a className={s.nav_link} href="/notes">
                      Notas
                    </a>
                  </div>
                </div>
              </section>
              <section>
                <div className={s.nav_izq_container}>
                  {token && Object.keys(token).length > 0 ? (
                    <div className={s.logout_container}>
                      <a className={s.nav_link} href="/logout">
                        Cerrar Sesión
                      </a>
                    </div>
                  ) : (
                    <>
                      {!Object.keys(token).length > 0 && (
                        <div className={s.signin_container}>
                          <a className={s.nav_link} href="/signin">
                            Inicio Sesión
                          </a>
                        </div>
                      )}
                      {!Object.keys(token).length > 0 && (
                        <div className={s.signin_container}>
                          <a className={s.nav_link} href="/signup">
                            Registrarse
                          </a>
                        </div>
                      )}
                    </>
                  )}
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
