import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionReveal({ children, className = "", delay = 0, as = "section", id }) {
  const Component = motion[as];

  return (
    <Component
      id={id}
      className={`${id ? "scroll-mt-28 sm:scroll-mt-32 " : ""}${className}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
