import { useEffect, useRef } from "react";

const TECH = [
  "react",
  "typescript",
  "javascript",
  "tailwindcss",
  "framer",
  "claude",
  "nodedotjs",
  "python",
  "vite",
  "git",
  "github",
  "docker",
  "postgresql",
  "mongodb",
  "anthropic",
  "telegram",
  "fastapi",
  "express",
  "figma",
  "vercel",
  "nextdotjs",
];

const ROW1 = TECH.slice(0, 11);
const ROW2 = TECH.slice(11);

function Tile({ slug }: { slug: string }) {
  return (
    <div className="glass group flex items-center justify-center gap-3 w-[220px] h-[130px] rounded-2xl shrink-0 transition-colors duration-300 hover:border-white/30">
      <img
        src={`https://cdn.simpleicons.org/${slug}/D7E2EA`}
        alt={slug}
        loading="lazy"
        className="w-10 h-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      target.current = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let raf: number;
    const tick = () => {
      current.current += (target.current - current.current) * 0.08;
      const offset = current.current - 200;
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${offset}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-offset}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const row1Tiles = [...ROW1, ...ROW1, ...ROW1];
  const row2Tiles = [...ROW2, ...ROW2, ...ROW2];

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10">
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: "transform" }}>
          {row1Tiles.map((slug, i) => (
            <Tile key={`${slug}-${i}`} slug={slug} />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: "transform" }}>
          {row2Tiles.map((slug, i) => (
            <Tile key={`${slug}-${i}`} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
