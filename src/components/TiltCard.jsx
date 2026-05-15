import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "", as = "article", intensity = 14, ...props }) {
  const Component = motion[as];
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 22, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 22, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <Component
      {...props}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...(props.style || {}) }}
    >
      {children}
    </Component>
  );
}
