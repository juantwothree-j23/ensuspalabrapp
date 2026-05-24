import { useState, useEffect, useCallback } from "react";

const EARLY = [
  "¿Cómo te pusieron tu nombre? ¿Hay una historia detrás?",
  "¿Dónde naciste? ¿Ahí creciste también?",
  "¿Cómo eran tu mamá y tu papá?",
  "¿De dónde venía tu familia?",
  "¿Cómo se conocieron tus padres?",
  "¿Cómo eran tus abuelos?",
  "¿Cuáles son tus recuerdos más tempranos?",
  "¿A qué se dedicaban tus papás?",
  "¿Cómo eran tus hermanos cuando eran chicos?",
  "¿Me puedes contar un recuerdo o anécdota de tus hermanos?",
  "¿Cómo pasaba el tiempo tu familia cuando eras chico/a?",
  "¿Con quién pasabas más tiempo de niño/a?",
  "¿Tu familia tenía alguna tradición especial?",
  "¿Cómo era la casa donde creciste?",
  "¿Tuviste mascotas? ¿Alguna que recuerdes?",
  "¿Había algún familiar —tío, abuela, primo— con quien fueras muy cercano?",
  "¿A qué colegio fuiste?",
  "¿Cuál es tu recuerdo más feliz de la infancia?",
  "¿Qué momentos del colegio recuerdas más?",
  "¿Quiénes eran tus amigos de la infancia?",
  "¿Cuáles eran tus juegos o juguetes favoritos?",
  "¿Alguno de esos amigos/as de la infancia sigue en tu vida?",
  "¿Qué hacías para entretenerte cuando eras chico?",
  "¿Qué películas, música y libros te gustaban?",
  "¿Te enfermaste gravemente o tuviste algún accidente serio en tu infancia?",
  "¿En qué colegio estudiaste la enseñanza media?",
  "¿Hubo algún profesor, entrenador o adulto que te marcó de verdad?",
  "¿Cuáles eran tus materias favoritas en el colegio?",
  "¿Qué querías ser cuando grande?",
  "¿Cómo se vestía la gente en tu época de colegio?",
  "¿Te ganaste algún reconocimiento o premio en el colegio?",
  "¿Cambió tu relación con tu familia cuando llegaste a la adolescencia?",
  "¿Quiénes eran tus amigos más cercanos en el colegio?",
  "¿Dónde se juntaban y qué hacían?",
  "¿Qué cosas rebeldes hacías de adolescente?",
  "¿Pololeaste en el colegio?",
  "¿Cuál fue tu salida o cita más memorable de adolescente?",
  "¿Trabajaste de joven? ¿En qué?",
  "¿En qué te gastabas la plata?",
  "Cuéntame de tu primer auto.",
  "¿Cuándo fue tu primer choque de auto?",
  "¿Practicabas algún deporte en el colegio?",
  "¿Participabas en otras actividades fuera de clases?",
  "¿Qué libros, películas y música te gustaban de adolescente?",
  "¿Quiénes eran los famosos o famosas de tu época?",
  "¿Qué consejo le darías a un adolescente de hoy?",
  "¿Cuál es la historia más loca que tienes de tu adolescencia?",
  "Cuéntame de la vez que más te retaron tus papás.",
  "¿Qué le dirías a ti mismo de adolescente?"
];

const MID = [
  "¿Estudiaste algo después del colegio?",
  "¿Qué estudiaste?",
  "¿Hubo algún profesor o mentor que te marcó en esa época?",
  "¿Trabajaste mientras estudiabas?",
  "¿Hiciste el servicio militar o tuviste familiares cercanos que lo hicieran?",
  "¿Quiénes eran tus mejores amigos a los veinte años?",
  "¿Con quién pasabas más tiempo en esa época?",
  "¿Qué recuerdos tienes de tus amigos de los veinte?",
  "¿Cómo era tu vida amorosa a los veinte?",
  "¿Cómo conociste a tu pareja?",
  "¿Recuerdas adónde fueron en su primera salida con tu primer amor?",
  "¿Qué te atrajo de tu pareja?",
  "¿Cómo era tu pareja en esa época?",
  "¿Cómo fue la propuesta de matrimonio?",
  "¿Cuánto tiempo pololearon antes de comprometerse?",
  "¿Qué opinaron tus amigos y familia de tu pareja?",
  "¿Qué edad tenías cuando te casaste?",
  "Cuéntame de tu matrimonio. ¿Cómo fue?",
  "¿A dónde fueron de luna de miel?",
  "¿Cómo fueron los primeros años de casados?",
  "¿Qué es lo que más admirabas de tu pareja?",
  "¿Qué has aprendido de tu pareja?",
  "¿Cuál fue la parte más difícil del matrimonio en esa época?",
  "¿Cuántos hijos tuvieron?",
  "¿Qué edad tenías cuando nació tu primer hijo?",
  "¿Cómo fue cuando se enteraron de que iban a ser papás?",
  "Cuéntame del día que nació tu primer hijo/a.",
  "¿Cómo eligieron los nombres de sus hijos?",
  "Cuéntame de cada uno de tus hijos.",
  "¿Cómo eran las fiestas y celebraciones cuando tus hijos eran chicos?",
  "¿Cuál fue el viaje familiar más memorable que hicieron?",
  "¿Cuáles son tus recuerdos favoritos con tus hijos?",
  "¿Cuál es tu historia favorita de cuando tus hijos/as eran adolescentes?",
  "Cuéntame de un momento del que te hayas sentido muy orgulloso.",
  "¿Cómo fue cuando tus hijos se fueron de la casa?",
  "¿Perdiste algún familiar cercano durante esta época?",
  "¿A qué te dedicaste en tu vida profesional?",
  "¿Cuáles son tus logros profesionales de los que más te enorgulleces?",
  "¿Quiénes fueron tus mejores amigos en esta etapa?",
  "¿Cómo se juntaban con tus amigos entre los 20 y los 30?",
  "¿Qué hacías en tu tiempo libre fuera del trabajo?",
  "¿Tenías o desarrollaste algún hobby?",
  "¿Qué hacías para entretenerte?",
  "¿Eras parte de algún grupo, club o comunidad?"
];

const LATE = [
  "¿Cómo fue convertirte en abuelo o abuela?",
  "¿Qué es lo mejor de ser abuelo o abuela?",
  "¿Qué es lo más difícil de envejecer?",
  "¿Cómo ha cambiado tu relación con tus hijos/as en estos años?",
  "¿Cuál es la peor noticia que has recibido en tu vida?",
  "¿Has perdido algún familiar cercano en estos últimos años?",
  "¿Quiénes son tus mejores amigos hoy?",
  "¿Quién es tu amigo/a más antiguo? ¿Cómo se conocieron?",
  "¿Cómo se juntan ahora?",
  "¿Cuándo decidiste jubilarte?",
  "¿Cómo has vivido la jubilación?",
  "¿Qué haces para entretenerte hoy?",
  "¿Qué películas, música y libros disfrutas ahora?",
  "¿Cuáles son las cosas más importantes que has aprendido en la vida?",
  "¿Qué valoras más en un amigo?",
  "¿Qué fue lo más importante que aprendiste de tu mamá? ¿Y de tu papá?",
  "¿Cuál es la persona más sabia que has conocido? ¿Qué te enseñó?",
  "¿Sobre qué has cambiado de opinión con los años?",
  "¿Qué consejo les darías a tus hijos y nietos sobre ser padres?",
  "¿Qué fue lo más difícil de criar hijos?",
  "¿Qué fue lo más gratificante de ser papá o mamá?",
  "¿Qué canción te pone de buen humor de inmediato?",
  "¿Qué consejo de vida le darías a alguien de mi edad?",
  "¿Qué quieres que sea tu legado?",
  "¿La religión o la espiritualidad han jugado un rol en tu vida? ¿Cómo?",
  "¿Tienes algún lema o frase que te guíe?",
  "¿Hay algún sueño al que le dijiste que no con el tiempo?",
  "¿Qué película te ha inspirado más? ¿Por qué?",
  "¿Qué cosas tienes pendientes en tu lista de la vida?",
  "¿Cuáles son tus posesiones más preciadas? ¿Por qué?",
  "¿Qué es algo que siempre te alegra?",
  "¿Qué harías si el dinero no fuera un problema?",
  "¿Qué consejo profesional le darías a alguien que está empezando?",
  "¿Cuál es tu superpoder?",
  "¿Tienes algún consejo para elegir un camino en la vida?",
  "Si pudieras viajar a cualquier parte del mundo, ¿adónde irías?",
  "Si te ganaras un millón de dólares, ¿en qué lo gastarías?",
  "¿Cuál es la mejor noticia que has recibido en tu vida?",
  "¿A qué época de tu vida volverías? ¿Por qué?",
  "¿En qué es distinta la sociedad de hoy a la que conociste de niño?",
  "¿Cuál es la cosa más vergonzosa que has hecho?",
  "¿Cuál es tu recuerdo más preciado?",
  "¿Qué es lo más lindo que alguien ha hecho por ti?",
  "¿Cuál es la cosa más valiente que has hecho?",
  "¿Cuál ha sido la pérdida más importante de tu vida?",
  "¿Cuál es la cosa más aterradora que te ha pasado?",
  "¿Cuál ha sido lo más difícil que has vivido?",
  "¿De qué te arrepientes?",
  "¿Qué le dirías a tu yo del pasado?",
  "¿Qué es lo que más te hace sentir vivo?",
  "¿Qué es algo que valoras de la generación de hoy?",
  "¿Cuáles son las creencias que más defiendes?",
  "En mi funeral, quisiera que me recuerden como ___."
];

const STAGES = {
  early: {
    key: "early",
    shortLabel: "PRIMERA ETAPA",
    name: "Primeros años",
    ageRange: "0 — 20 años",
    questions: EARLY,
    cardBg: "#F0E6FA",
    cardFg: "#4A0D67",
    accent: "#AA54D3",
    btnBg: "#F0E6FA",
    btnFg: "#4A0D67",
    dot: "#AA54D3",
  },
  mid: {
    key: "mid",
    shortLabel: "SEGUNDA ETAPA",
    name: "Vida adulta",
    ageRange: "20 — 50 años",
    questions: MID,
    cardBg: "#AA54D3",
    cardFg: "#FFFFFF",
    accent: "#7B2FA8",
    btnBg: "#AA54D3",
    btnFg: "#FFFFFF",
    dot: "#AA54D3",
  },
  late: {
    key: "late",
    shortLabel: "TERCERA ETAPA",
    name: "Legado",
    ageRange: "50 años y más",
    questions: LATE,
    cardBg: "#4A0D67",
    cardFg: "#F0E6FA",
    accent: "#AA54D3",
    btnBg: "#4A0D67",
    btnFg: "#F0E6FA",
    dot: "#4A0D67",
  },
};

const CARD_BACK_BG = "#4A0D67";
const CREAM = "#FBF8F3";
const PURPLE = "#4A0D67";
const PURPLE_MID = "#AA54D3";
const LAVANDA = "#F0E6FA";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&family=Space+Mono&display=swap');

  .esp-root { font-family: 'DM Sans', system-ui, sans-serif; }
  .f-syne { font-family: 'Syne', Georgia, serif; }
  .f-mono { font-family: 'Space Mono', monospace; }
  .f-dm { font-family: 'DM Sans', system-ui, sans-serif; }

  .card-scene { perspective: 1200px; }
  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.72s cubic-bezier(0.4, 0.2, 0.2, 1);
    position: relative;
    width: 100%;
    height: 100%;
  }
  .card-3d.flipped { transform: rotateY(180deg); }
  .card-side {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .card-question-side { transform: rotateY(180deg); }

  @keyframes esp-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes esp-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .anim-up { animation: esp-fade-up 0.5s ease forwards; }
  .anim-up-2 { animation: esp-fade-up 0.5s 0.1s ease forwards; opacity: 0; }
  .anim-up-3 { animation: esp-fade-up 0.5s 0.2s ease forwards; opacity: 0; }
  .anim-up-4 { animation: esp-fade-up 0.5s 0.3s ease forwards; opacity: 0; }
  .anim-fade { animation: esp-fade 0.35s ease forwards; }

  .btn-stage {
    cursor: pointer;
    border: none;
    text-align: left;
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-stage:active { transform: scale(0.97); }

  .btn-icon {
    cursor: pointer;
    border: none;
    background: transparent;
    transition: opacity 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-icon:active { opacity: 0.6; }

  .btn-reset {
    cursor: pointer;
    background: transparent;
    transition: opacity 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-reset:active { opacity: 0.5; }

  .btn-main {
    cursor: pointer;
    border: none;
    transition: transform 0.12s, opacity 0.12s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-main:active { transform: scale(0.97); opacity: 0.88; }

  .tag-dot {
    width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0;
  }
`;

function useFonts() {
  useEffect(() => {
    const existing = document.getElementById("esp-fonts");
    if (existing) return;
    const link = document.createElement("link");
    link.id = "esp-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&family=Space+Mono&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function App() {
  useFonts();

  const [screen, setScreen] = useState("splash");
  const [used, setUsed] = useState({ early: [], mid: [], late: [] });
  const [sessionCounts, setSessionCounts] = useState({ early: 0, mid: 0, late: 0 });
  const [currentCard, setCurrentCard] = useState(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showInstr, setShowInstr] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [emptyStage, setEmptyStage] = useState(null);

  const totalUsed = sessionCounts.early + sessionCounts.mid + sessionCounts.late;

  const available = useCallback(
    (key) =>
      STAGES[key].questions
        .map((q, i) => ({ q, i, key }))
        .filter(({ i }) => !used[key].includes(i)),
    [used]
  );

  const drawCard = useCallback(
    (key) => {
      const pool =
        key === "random"
          ? Object.keys(STAGES).flatMap((k) => available(k))
          : available(key);

      if (pool.length === 0) {
        setEmptyStage(key === "random" ? "todas las etapas" : STAGES[key].name);
        setTimeout(() => setEmptyStage(null), 2800);
        return;
      }

      const item = pool[Math.floor(Math.random() * pool.length)];
      setCurrentCard({ question: item.q, index: item.i, stageKey: item.key });
      setCardFlipped(false);
      setScreen("card");
    },
    [available]
  );

  useEffect(() => {
    if (screen === "card") {
      const t = setTimeout(() => setCardFlipped(true), 380);
      return () => clearTimeout(t);
    }
  }, [screen, currentCard]);

  const closeCard = useCallback(() => {
  setCardFlipped(false);
  setTimeout(() => {
    if (currentCard) {
      const k = currentCard.stageKey;
      setUsed((p) => ({ ...p, [k]: [...p[k], currentCard.index] }));
      setSessionCounts((p) => {
        const updated = { ...p, [k]: p[k] + 1 };
        const total = updated.early + updated.mid + updated.late;
        if (total === 6) setShowPromo(true);
        return updated;
      });
    }
    setScreen("main");
  }, 680);
}, [currentCard]);

  const reset = useCallback(() => {
    setUsed({ early: [], mid: [], late: [] });
    setSessionCounts({ early: 0, mid: 0, late: 0 });
    setCurrentCard(null);
    setScreen("splash");
  }, []);

  return (
    <div
      className="esp-root"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: CREAM,
        position: "relative",
      }}
    >
      <style>{css}</style>

      {screen === "splash" && <Splash onStart={() => setScreen("main")} />}
      {screen === "main" && (
        <Main
          used={used}
          sessionCounts={sessionCounts}
          totalUsed={totalUsed}
          onDraw={drawCard}
          onInstr={() => setShowInstr(true)}
          onReset={reset}
          emptyStage={emptyStage}
          available={available}
        />
      )}
      {screen === "card" && currentCard && (
        <CardScreen card={currentCard} flipped={cardFlipped} onClose={closeCard} />
      )}

  {showInstr && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            minHeight: "100%",
            background: "rgba(74,13,103,0.55)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 50,
          }}
        >
          <Instructions onClose={() => setShowInstr(false)} />
        </div>
      )}
 
      {showPromo && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            minHeight: "100%",
            background: "rgba(74,13,103,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            className="anim-up"
            style={{
              background: CREAM,
              borderRadius: 24,
              padding: "32px 28px 28px",
              width: "100%",
              maxWidth: 380,
              position: "relative",
            }}
          >
            <button
              className="btn-icon"
              onClick={() => setShowPromo(false)}
              style={{
                position: "absolute",
                top: 16, right: 16,
                width: 32, height: 32,
                borderRadius: "50%",
                border: `1.5px solid ${PURPLE}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon color={PURPLE} />
            </button>
 
            <div
              className="f-mono"
              style={{ fontSize: 10, color: PURPLE_MID, letterSpacing: "0.12em", marginBottom: 14 }}
            >
              EN SUS PALABRAS
            </div>
 
            <div
              className="f-syne"
              style={{ fontSize: 22, fontWeight: 600, color: PURPLE, lineHeight: 1.2, marginBottom: 14 }}
            >
              ¿Te gustaría registrar esta conversación?
            </div>
 
            <div
              className="f-dm"
              style={{ fontSize: 15, color: PURPLE, fontWeight: 300, lineHeight: 1.6, opacity: 0.75, marginBottom: 28 }}
            >
              Graba esta sesión en un estudio profesional y dale el formato que se merece.
            </div>
 
            <a
              href="https://juantwothree.cl/ensuspalabras"
              target="_blank"
              rel="noopener noreferrer"
              className="DM Sans"
              style={{
                display: "block",
                width: "100%",
                background: PURPLE,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "16px 0",
                borderRadius: 12,
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              QUIERO SABER MÁS
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Splash({ onStart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: CREAM,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 32px",
        maxWidth: 480,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="anim-up" style={{ textAlign: "center", marginBottom: 12 }}>
        <div
          className="f-mono"
          style={{ fontSize: 11, color: PURPLE_MID, letterSpacing: "0.14em", marginBottom: 28 }}
        >
          JUAN TWO THREE
        </div>
        <div
          className="f-syne"
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: PURPLE,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 18,
          }}
        >
          En sus
          <br />
          palabras
        </div>
        <div
          className="f-dm"
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: PURPLE,
            fontStyle: "italic",
            opacity: 0.72,
            lineHeight: 1.5,
            maxWidth: 260,
            margin: "0 auto",
          }}
        >
          Una pregunta.
          <br />
          Una historia por conocer.
        </div>
      </div>

      <div className="anim-up-3" style={{ marginTop: 56 }}>
        <Ornament />
      </div>

      <div className="anim-up-4" style={{ marginTop: 56, width: "100%", maxWidth: 280 }}>
        <button
          className="btn-main f-syne"
          onClick={onStart}
          style={{
            width: "100%",
            background: PURPLE,
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "18px 0",
            borderRadius: 14,
            border: "none",
          }}
        >
          INICIAR
        </button>
      </div>

      <div className="anim-fade" style={{ marginTop: 32, textAlign: "center", display: "flex", flexDirection: "column", gap: 5 }}>
        <div className="f-mono" style={{ fontSize: 10, color: PURPLE, opacity: 0.35, letterSpacing: "0.1em" }}>
          MÁS DE 100 PREGUNTAS
        </div>
        <div className="f-mono" style={{ fontSize: 10, color: PURPLE, opacity: 0.25, letterSpacing: "0.1em" }}>
          3 ETAPAS DE LA VIDA
        </div>
      </div>
    </div>
  );
}

function Ornament() {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
      <circle cx="6" cy="12" r="3" fill={PURPLE_MID} opacity="0.4" />
      <circle cx="24" cy="12" r="5" fill={PURPLE} opacity="0.8" />
      <circle cx="42" cy="12" r="3" fill={PURPLE_MID} opacity="0.4" />
      <line x1="9" y1="12" x2="19" y2="12" stroke={PURPLE} strokeWidth="1" opacity="0.3" />
      <line x1="29" y1="12" x2="39" y2="12" stroke={PURPLE} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function Main({ used, sessionCounts, totalUsed, onDraw, onInstr, onReset, emptyStage, available }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: CREAM,
        display: "flex",
        flexDirection: "column",
        padding: "0 0 16px",
        maxWidth: 480,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 10px",
        }}
      >
        <div>
          <div className="f-mono" style={{ fontSize: 10, color: PURPLE_MID, letterSpacing: "0.12em", opacity: 0.7 }}>
            JUAN TWO THREE
          </div>
          <div className="f-syne" style={{ fontSize: 20, fontWeight: 800, color: PURPLE, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            En sus palabras
          </div>
        </div>
        <button
          className="btn-icon"
          onClick={onInstr}
          aria-label="Ver instrucciones"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1.5px solid ${PURPLE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span className="f-syne" style={{ fontSize: 16, fontWeight: 700, color: PURPLE, lineHeight: 1 }}>
            ?
          </span>
        </button>
      </div>

      <div style={{ flex: 1, padding: "8px 20px 0" }}>
        {/* Stage buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.values(STAGES).map((st, idx) => {
            const avail = available(st.key).length;
            const isExhausted = avail === 0;
            return (
              <StageButton
                key={st.key}
                stage={st}
                available={avail}
                exhausted={isExhausted}
                delay={idx * 0.07}
                onClick={() => onDraw(st.key)}
              />
            );
          })}

          {/* Random button */}
          <RandomButton onClick={() => onDraw("random")} delay={0.21} />
        </div>

        {/* Empty stage toast */}
        {emptyStage && (
          <div
            className="anim-fade f-dm"
            style={{
              marginTop: 16,
              background: LAVANDA,
              color: PURPLE,
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            Ya se usaron todas las preguntas de {emptyStage}.
          </div>
        )}
      </div>

      {/* Session footer */}
      <SessionFooter sessionCounts={sessionCounts} totalUsed={totalUsed} onReset={onReset} />
    </div>
  );
}

function StageButton({ stage, available, exhausted, delay, onClick }) {
  return (
    <button
      className="btn-stage anim-up"
      onClick={onClick}
      disabled={exhausted}
      style={{
        background: exhausted ? "#f0ebe8" : stage.btnBg,
        color: exhausted ? "#b0a8a3" : stage.btnFg,
        borderRadius: 14,
        padding: "14px 20px",
        width: "100%",
        opacity: exhausted ? 0.6 : 1,
        animationDelay: `${delay}s`,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <div className="f-mono" style={{ fontSize: 10, letterSpacing: "0.13em", opacity: 0.55 }}>
        {stage.ageRange}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="f-syne" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>
          {stage.name}
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M6.5 4L11.5 9L6.5 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

function RandomButton({ onClick, delay }) {
  return (
    <button
      className="btn-stage anim-up"
      onClick={onClick}
      style={{
        background: "transparent",
        border: `1.5px solid ${PURPLE}`,
        color: PURPLE,
        borderRadius: 14,
        padding: "16px 20px",
        width: "100%",
        animationDelay: `${delay}s`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div className="f-mono" style={{ fontSize: 10, letterSpacing: "0.13em", opacity: 0.55, marginBottom: 3 }}>
          CUALQUIER ETAPA
        </div>
        <div className="f-syne" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>
          Al azar
        </div>
      </div>
      <DiceIcon />
    </button>
  );
}

function DiceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="22" rx="5" stroke={PURPLE} strokeWidth="1.6" />
      <circle cx="9.5" cy="9.5" r="1.8" fill={PURPLE} />
      <circle cx="18.5" cy="9.5" r="1.8" fill={PURPLE} />
      <circle cx="14" cy="14" r="1.8" fill={PURPLE} />
      <circle cx="9.5" cy="18.5" r="1.8" fill={PURPLE} />
      <circle cx="18.5" cy="18.5" r="1.8" fill={PURPLE} />
    </svg>
  );
}

function SessionFooter({ sessionCounts, totalUsed, onReset }) {
  return (
    <div
      style={{
        marginTop: 8,
        padding: "0 20px",
        borderTop: `1px solid ${PURPLE}20`,
        paddingTop: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div>
          <div
            className="f-mono"
            style={{ fontSize: 10, color: PURPLE, opacity: 0.45, letterSpacing: "0.1em", marginBottom: 4 }}
          >
            SESIÓN ACTUAL
          </div>
          <div
            className="f-syne"
            style={{ fontSize: 24, fontWeight: 800, color: PURPLE, lineHeight: 1 }}
          >
            {totalUsed}{" "}
            <span className="f-dm" style={{ fontSize: 14, fontWeight: 300, opacity: 0.6 }}>
              {totalUsed === 1 ? "pregunta" : "preguntas"}
            </span>
          </div>
        </div>

        <button
          className="btn-reset f-mono"
          onClick={onReset}
          style={{
            fontSize: 11,
            color: PURPLE,
            opacity: 0.5,
            border: `1px solid ${PURPLE}40`,
            borderRadius: 8,
            padding: "8px 14px",
            letterSpacing: "0.08em",
          }}
        >
          REINICIAR
        </button>
      </div>

      {totalUsed > 0 && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.values(STAGES).map((st) => {
            const count = sessionCounts[st.key];
            if (count === 0) return null;
            return (
              <div
                key={st.key}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span className="tag-dot" style={{ background: st.dot }} />
                <span
                  className="f-dm"
                  style={{ fontSize: 12, color: PURPLE, opacity: 0.6, fontWeight: 300 }}
                >
                  {st.name}: {count}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CardScreen({ card, flipped, onClose }) {
  const stage = STAGES[card.stageKey];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: CREAM,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Close button */}
      <button
        className="btn-icon"
        onClick={onClose}
        aria-label="Cerrar carta"
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `${PURPLE}10`,
          border: `1.5px solid ${PURPLE}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <CloseIcon color={PURPLE} />
      </button>

      {/* Card */}
      <div
        className="card-scene"
        style={{
          width: "min(88vw, 340px)",
          height: "min(72vh, 480px)",
          flexShrink: 0,
        }}
      >
        <div className={`card-3d${flipped ? " flipped" : ""}`}>
          {/* Back face (ESP branding) */}
          <div className="card-side" style={{ borderRadius: 24, background: CARD_BACK_BG }}>
            <CardBack />
          </div>

          {/* Question face */}
          <div
            className="card-side card-question-side"
            style={{
              borderRadius: 24,
              background: stage.cardBg,
              border: `1.5px solid ${stage.cardFg}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(20px, 5vw, 36px) clamp(16px, 5vw, 28px)",
              gap: "clamp(16px, 3vh, 28px)",
              overflow: "hidden",
            }}
          >
            <div
              className="f-mono"
              style={{
                fontSize: 10,
                color: stage.cardFg,
                opacity: 0.5,
                letterSpacing: "0.14em",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {stage.name.toUpperCase()}
            </div>

            <div
              className="f-syne"
              style={{
                fontSize: "clamp(16px, 4.5vw, 24px)",
                fontWeight: 700,
                color: stage.cardFg,
                lineHeight: 1.35,
                textAlign: "center",
                letterSpacing: "-0.01em",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                maxHeight: "55%",
                overflow: "hidden",
              }}
            >
              {card.question}
            </div>

            <div style={{ marginTop: "auto", flexShrink: 0 }}>
              <SmallOrnament color={stage.cardFg} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="f-dm"
        style={{
          marginTop: 28,
          fontSize: 13,
          color: PURPLE,
          opacity: 0.38,
          fontWeight: 300,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Toca × para cerrar y pasar a la siguiente
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 12,
        padding: 32,
        borderRadius: 24,
        border: `1px solid ${PURPLE_MID}40`,
        boxSizing: "border-box",
      }}
    >
      <div
        className="f-mono"
        style={{ fontSize: 9, color: LAVANDA, opacity: 0.5, letterSpacing: "0.16em", width: "100%", textAlign: "center" }}
      >
        JUAN TWO THREE
      </div>
      <div
        className="f-syne"
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          width: "100%",
        }}
      >
        En sus
        <br />
        palabras
      </div>
      <div style={{ marginTop: 8 }}>
        <BackOrnament />
      </div>
    </div>
  );
}

function BackOrnament() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke={PURPLE_MID} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="20" stroke={PURPLE_MID} strokeWidth="0.6" opacity="0.3" />
      <circle cx="30" cy="30" r="5" fill={PURPLE_MID} opacity="0.6" />
      <line x1="30" y1="2" x2="30" y2="14" stroke={PURPLE_MID} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="46" x2="30" y2="58" stroke={PURPLE_MID} strokeWidth="0.8" opacity="0.4" />
      <line x1="2" y1="30" x2="14" y2="30" stroke={PURPLE_MID} strokeWidth="0.8" opacity="0.4" />
      <line x1="46" y1="30" x2="58" y2="30" stroke={PURPLE_MID} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function SmallOrnament({ color }) {
  return (
    <svg width="32" height="8" viewBox="0 0 32 8" fill="none">
      <circle cx="3" cy="4" r="2" fill={color} opacity="0.3" />
      <circle cx="16" cy="4" r="3" fill={color} opacity="0.5" />
      <circle cx="29" cy="4" r="2" fill={color} opacity="0.3" />
      <line x1="5" y1="4" x2="13" y2="4" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="19" y1="4" x2="27" y2="4" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function CloseIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1L13 13M13 1L1 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Instructions({ onClose }) {
  const tips = [
    "Designa un entrevistador o túrnense haciendo preguntas.",
    "Quien entrevista lee la carta en voz alta y escucha con curiosidad.",
    "Permite que el entrevistado piense antes de responder. No interrumpas.",
    "Haz preguntas de seguimiento para profundizar. Las mejores historias están en los detalles.",
    "Sáltate o modifica las preguntas que no apliquen. No hay orden obligatorio.",
    "Cada sesión lleva registro de qué preguntas se han hecho. Al reiniciar, vuelves al inicio.",
    "El botón «Al azar» elige una pregunta de cualquiera de las tres etapas.",
    "Algunas cartas de la segunda etapa hacen referencia a pareja o hijos. Si no aplican, ignóralas — hay mucho más por descubrir.",
  ];

  return (
    <div
      className="anim-up"
      style={{
        background: CREAM,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 430,
        padding: "28px 24px 36px",
        maxHeight: "88vh",
        overflowY: "auto",
      }}
    >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div className="f-mono" style={{ fontSize: 10, color: PURPLE_MID, letterSpacing: "0.12em", marginBottom: 4 }}>
              CÓMO JUGAR
            </div>
            <div className="f-syne" style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>
              Instrucciones
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={onClose}
            aria-label="Cerrar instrucciones"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `1.5px solid ${PURPLE}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon color={PURPLE} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tips.map((tip, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                className="f-mono"
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: i < 5 ? LAVANDA : `${PURPLE}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: PURPLE,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </div>
              <div
                className="f-dm"
                style={{ fontSize: 15, color: PURPLE, fontWeight: 300, lineHeight: 1.55, opacity: 0.85 }}
              >
                {tip}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: "16px",
            background: LAVANDA,
            borderRadius: 12,
          }}
        >
          <div
            className="f-dm"
            style={{
              fontSize: 14,
              color: PURPLE,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            «Una buena historia necesita movimiento y reflexión.
            Alterna preguntas cronológicas con preguntas reflexivas.»
          </div>
        </div>

        <button
          className="btn-main f-syne"
          onClick={onClose}
          style={{
            marginTop: 24,
            width: "100%",
            background: PURPLE,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "16px 0",
            borderRadius: 12,
            border: "none",
          }}
        >
          ENTENDIDO
        </button>
    </div>
  );
}