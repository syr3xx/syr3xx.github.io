interface ContactButtonProps {
  label: string;
  className?: string;
}

export default function ContactButton({ label, className }: ContactButtonProps) {
  return (
    <a
      href="https://t.me/syr3xx"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-6 py-2.5 sm:px-8 sm:py-3 md:px-9 md:py-3.5 text-[11px] sm:text-xs md:text-sm text-[#0C0C0C] font-normal uppercase tracking-widest transition-colors duration-300 hover:bg-transparent hover:text-[#D7E2EA] ${className ?? ""}`}
    >
      {label}
    </a>
  );
}
