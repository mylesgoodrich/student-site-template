import type { Variants } from "framer-motion";

const defaultTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

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
