import { useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Expand, ImageOff } from "lucide-react";
import GradientBlob from "../components/GradientBlob";
import Lightbox from "../components/Lightbox";
import LiveProjectButton from "../components/LiveProjectButton";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  num: string;
  category: string;
  name: string;
  tag: string;
  live?: string;
  soon?: boolean;
  description?: string;
  images?: { col1: [string, string]; col2: string };
}

function ProjectImg({
  src,
  className,
  style,
  objectPosition,
  onOpen,
}: {
  src?: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  onOpen?: (src: string) => void;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        style={style}
        className={`flex items-center justify-center bg-[#141414] border border-[#D7E2EA]/10 ${className ?? ""}`}
      >
        <ImageOff className="w-6 h-6 text-[#D7E2EA]/30" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(src)}
      aria-label="Open screenshot"
      style={style}
      className={`group relative block cursor-pointer overflow-hidden border border-[#D7E2EA]/10 ${className ?? ""}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ objectPosition: objectPosition ?? "center" }}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
        <Expand className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </span>
    </button>
  );
}

function ProjectCard({
  project,
  index,
  total,
  liveLabel,
  soonLabel,
  onOpenImage,
}: {
  project: Project;
  index: number;
  total: number;
  liveLabel: string;
  soonLabel: string;
  onOpenImage: (src: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.6,
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(smoothProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-24 md:top-32 h-[85vh]">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C]/70 backdrop-blur-xl p-4 sm:p-6 md:p-8 h-full flex flex-col"
      >
        <div className="flex flex-wrap items-start gap-4 sm:gap-6 justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-normal text-[#0C0C0C]"
              style={{
                fontSize: "clamp(1.8rem, 5.5vw, 80px)",
                WebkitTextStroke: "1.5px #D7E2EA",
              }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-[10px] sm:text-xs">
                {project.category} · {project.tag}
              </span>
              <span className="text-[#D7E2EA] font-normal uppercase text-base sm:text-xl md:text-2xl">
                {project.name}
              </span>
            </div>
          </div>
          {project.soon ? (
            <LiveProjectButton label={soonLabel} disabled />
          ) : project.live ? (
            <LiveProjectButton label={liveLabel} href={project.live} />
          ) : project.description ? (
            <p className="text-[#D7E2EA]/70 text-xs sm:text-sm leading-relaxed max-w-[280px] text-right">
              {project.description}
            </p>
          ) : null}
        </div>

        <div className="flex gap-3 mt-6 sm:mt-8 flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col gap-3 w-2/5">
            {/* aspect-ratio matches the real screenshot dimensions so the
                frame fits the photo instead of cropping it to fill an
                arbitrary box. */}
            <ProjectImg
              src={project.images?.col1[0]}
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-full"
              style={{ aspectRatio: "953 / 586" }}
              objectPosition="center 15%"
              onOpen={onOpenImage}
            />
            <ProjectImg
              src={project.images?.col1[1]}
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-full"
              style={{ aspectRatio: "915 / 511" }}
              objectPosition="left top"
              onOpen={onOpenImage}
            />
          </div>
          <ProjectImg
            src={project.images?.col2}
            className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-3/5 self-start"
            style={{ aspectRatio: "1006 / 817" }}
            objectPosition="top"
            onOpen={onOpenImage}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const projects: Project[] = [
    {
      ...t.projects.items[0],
      images: {
        col1: ["/projects/valocoach/hero.png", "/projects/valocoach/profile.png"],
        col2: "/projects/valocoach/dashboard.png",
      },
    },
    {
      num: "02",
      category: t.projects.soon,
      name: "???",
      tag: "",
      soon: true,
    },
    {
      num: "03",
      category: t.projects.soon,
      name: "???",
      tag: "",
      soon: true,
    },
  ];

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="absolute -top-[12%] -left-[8%] w-[380px] h-[380px] sm:w-[650px] sm:h-[650px] md:w-[800px] md:h-[800px] opacity-10 blur-2xl md:blur-[120px]" />
      </div>

      <div className="flex justify-center mb-16 sm:mb-20 md:mb-28">
        <h2
          className="glass-text font-normal uppercase leading-none tracking-tight text-center px-2"
          style={{ fontSize: "clamp(2.2rem, 7.2vw, 93px)" }}
        >
          {t.projects.heading}
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            total={projects.length}
            liveLabel={t.projects.live}
            soonLabel={t.projects.soon}
            onOpenImage={setLightboxSrc}
          />
        ))}
      </div>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  );
}
