import { motion } from "framer-motion";
import { BadgeCheck, BarChart3, ShieldCheck } from "lucide-react";
import logoMark from "../../imagenes/balto.png";
import logoBaltoAzul from "../../imagenes/Logo_Balto_Azul.png";

const TITULO = "Centralizá ventas, compras y reportes en un solo sistema.";
const SUBTITULO =
  "Balto simplifica tu operación diaria con módulos claros, reportes útiles y una experiencia rápida para equipos que necesitan orden y control real.";

const HIGHLIGHTS = [
  { icon: BadgeCheck, text: "Implementación simple" },
  { icon: BarChart3, text: "Reportes en tiempo real" },
  { icon: ShieldCheck, text: "Datos organizados y seguros" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#f7f9fc] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-24 lg:pb-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.10),transparent_33%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.07),transparent_34%)]" />

        <div className="absolute left-[-6rem] top-0 h-72 w-72 rounded-full bg-[rgba(0,85,187,0.10)] blur-[120px] sm:h-96 sm:w-96 sm:blur-[130px]" />

        <div className="absolute right-[-4rem] top-28 h-64 w-64 rounded-full bg-[rgba(10,37,64,0.08)] blur-[115px] sm:h-80 sm:w-80 sm:blur-[125px]" />

        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(10,37,64,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.55)_1px,transparent_1px)] [background-size:44px_44px]" />

        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.022] lg:block"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative mx-auto max-w-[430px] overflow-hidden rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[34px] sm:p-9 lg:mx-0">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.35)] to-transparent" />

              <div className="flex justify-center">
                <img
                  src={logoBaltoAzul}
                  alt="Balto Sistema Contable"
                  className="h-auto w-full max-w-[300px] object-contain drop-shadow-[0_18px_35px_rgba(10,37,64,0.10)] sm:max-w-[360px]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <h1 className="mx-auto max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-[var(--balto-midnight)] sm:text-5xl lg:mx-0 lg:text-7xl">
              {TITULO}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--balto-muted)] sm:text-lg lg:mx-0">
              {SUBTITULO}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}