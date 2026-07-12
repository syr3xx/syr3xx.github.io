interface LiveProjectButtonProps {
  label: string;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export default function LiveProjectButton({
  label,
  href,
  disabled,
  className,
}: LiveProjectButtonProps) {
  const classes = `backdrop-blur-sm bg-white/5 inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm text-[#D7E2EA] font-normal uppercase tracking-widest transition-colors duration-300 hover:bg-[#D7E2EA]/10 ${
    disabled ? "opacity-40 pointer-events-none" : ""
  } ${className ?? ""}`;

  if (disabled || !href) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {label}
    </a>
  );
}
