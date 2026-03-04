import type { Transition, Variants } from "framer-motion";

const defaultTransition: Transition = {
  duration: 0.4,
  ease: "easeOut",
};

/** Simple fade in (opacity only). */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
};

/** Fade in + slide up slightly. */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};
