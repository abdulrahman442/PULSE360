import { motion, useReducedMotion } from "motion/react";

const directions = {
  up: { x: 0, y: 35 },
  down: { x: 0, y: -35 },
  left: { x: 35, y: 0 },
  right: { x: -35, y: 0 },
};

function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;