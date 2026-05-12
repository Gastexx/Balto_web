import { motion } from "framer-motion";
import { BadgeCheck, BarChart3, ShieldCheck } from "lucide-react";
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
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#eef4fb] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-24 lg:pb-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.20),transparent_33%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.16),transparent_34%)]" />

        <div className="absolute left-[-6rem] top-0 h-72 w-72 rounded-full bg-[rgba(0,85,187,0.18)] blur-[120px] sm:h-96 sm:w-96 sm:blur-[130px]" />

        <div className="absolute right-[-4rem] top-28 h-64 w-64 rounded-full bg-[rgba(10,37,64,0.14)] blur-[115px] sm:h-80 sm:w-80 sm:blur-[125px]" />

        <div className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(10,37,64,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.65)_1px,transparent_1px)] [background-size:44px_44px]" />

      </div>

      <div className="relative mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div >
              <div />

              <div className="flex justify-center">
                <img
                  src={logoBaltoAzul}
                  alt="Balto Sistema Contable"
                  className="h-auto w-full max-w-[300px] object-contain drop-shadow-[0_22px_42px_rgba(10,37,64,0.18)] sm:max-w-[400px]"
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
            <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[var(--balto-midnight)] sm:text-5xl sm:leading-[1.02] lg:mx-0">
              {TITULO}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg lg:mx-0">
              {SUBTITULO}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}