"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE @ Amazon",
    initials: "PS",
    color: "from-blue-500 to-cyan-500",
    accentColor: "#3b82f6",
    rating: 5,
    quote:
      "CareerOS completely transformed my placement prep. The AI mock interviews felt incredibly real — when I walked into my Amazon interview, I was already prepared for every question type. Got placed in my dream company!",
  },
  {
    name: "Arjun Patel",
    role: "Frontend Dev @ Google",
    initials: "AP",
    color: "from-purple-500 to-pink-500",
    accentColor: "#a855f7",
    rating: 5,
    quote:
      "The resume analyzer caught issues I never noticed — wrong keywords, missing metrics, poor formatting. After optimizing with CareerOS, my callback rate went from 5% to over 40%. Absolutely game-changing tool.",
  },
  {
    name: "Sneha Reddy",
    role: "Data Analyst @ Microsoft",
    initials: "SR",
    color: "from-green-500 to-emerald-500",
    accentColor: "#22c55e",
    rating: 5,
    quote:
      "The skill roadmap feature gave me a clear path from where I was to where I needed to be. Combined with the mock interviews, I felt confident and prepared. Placed at Microsoft within 3 months of using CareerOS!",
  },
];

function TestimonialCard({
  t,
  index,
  inView,
}: {
  t: (typeof testimonials)[0];
  index: number;
  inView: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 * (index + 1),
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      }}
      className="perspective-container"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface p-6 sm:p-7 shadow-sm transition-all"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 10 : 0}px)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease",
          boxShadow: isHovered
            ? `0 20px 50px rgba(0,0,0,0.1), 0 0 30px ${t.accentColor}10`
            : "0 4px 24px rgba(0,0,0,0.05)",
          borderColor: isHovered ? `${t.accentColor}30` : "var(--color-outline-variant)",
        }}
      >
        {/* Holographic */}
        <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-2xl" />

        {/* Light sweep */}
        <div className="absolute inset-0 light-sweep" />

        {/* Quote icon — 3D depth */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <Quote className="mb-4 h-8 w-8 text-outline-variant" />
        </div>

        {/* Rating */}
        <div className="mb-4 flex gap-1" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ filter: "drop-shadow(0 0 4px rgba(250, 204, 21, 0.4))" }} />
          ))}
        </div>

        {/* Quote Text */}
        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant font-medium" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-outline-variant opacity-50" />

        {/* Author — 3D pop */}
        <div className="mt-6 flex items-center gap-3" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white shadow-lg`}
            style={{ boxShadow: `0 4px 16px ${t.accentColor}30` }}
          >
            {t.initials}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-on-surface">{t.name}</h4>
            <p className="text-xs text-on-surface-variant">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      {/* Accent line */}
      <div className="accent-line mx-auto max-w-xs mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl lg:text-5xl text-on-surface">
            Loved by{" "}
            <span className="text-primary font-black">10,000+ Students</span>
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant leading-relaxed">
            Real stories from real students who landed their dream placements.
          </p>
        </motion.div>

        {/* Testimonial Cards — 3D */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
