<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Mukta:wght@300&display=swap');
</style>;
import s from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <div className={s.container}>
        <section>
          <header>
            <div className={s.title_container}>
              <div className={s.line}>
                <p>Anotalo</p>
              </div>
              <div className={s.line2}></div>
              <div className={s.line3}></div>
            </div>
          </header>
        </section>
        <section>
          <div className={s.intro_container}>
            <p>
              En un mundo cada vez más dinámico y acelerado, es fundamental
              contar con una forma rápida y sencilla de capturar tus ideas y
              recordatorios importantes. <br /> <br />
              Presentamos orgullosamente "Anotalo", la aplicación de notas
              diseñada para simplificar tu vida, con "Anotalo", puedes tomar
              notas en un instante, organizar tus pensamientos y mantener un
              seguimiento de todas tus tareas y proyectos, ya sea que necesites
              recordar una brillante idea, hacer una lista de compras o tomar
              notas en una reunión, "Anotalo" está aquí para ayudarte. <br />
              <br />
              Descubre una interfaz intuitiva y minimalista que te permite
              enfocarte en lo que realmente importa: tus ideas. Ya sea en tu
              teléfono, tableta o en tu computadora "Anotalo" te acompaña en
              cada paso del camino, brindándote una experiencia de toma de notas
              fluida y sin complicaciones. <br />
              <br /> No pierdas más tiempo buscando papel y lápiz. Utiliza
              "Anotalo" hoy mismo y dale a tus ideas el espacio que se merecen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
