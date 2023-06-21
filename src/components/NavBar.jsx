import s from "./NavBar.module.css";

const NavBar = () => {
  return (
    <main>
      <div className={s.container}>
        <section>
          <nav>
            <div className={s.nav_container}>
              <div className={s.home_container}>
                <a className={s.nav_link} href="/">
                  Home
                </a>
              </div>
              <div className={s.notes_container}>
                <a className={s.nav_link} href="/notes">
                  Notes
                </a>
              </div>
              <div className={s.signup_container}>
                <a className={s.nav_link} href="/signup">
                  SignUp
                </a>
              </div>
              <div className={s.signin_container}>
                <a className={s.nav_link} href="/signin">
                  SignIn
                </a>
              </div>
              <div className={s.signin_container}>
                <a className={s.nav_link} href="/logout">
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </main>
  );
};

export default NavBar;
