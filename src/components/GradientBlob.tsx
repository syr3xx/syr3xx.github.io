export default function GradientBlob({ className }: { className?: string }) {
  return (
    <div className={`blob-pulse ${className ?? ""}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B600A8" />
            <stop offset="45%" stopColor="#7621B0" />
            <stop offset="100%" stopColor="#BE4C00" />
          </linearGradient>
        </defs>
        <path
          fill="url(#blobGradient)"
          d="M45.2,-58.3C58.4,-49.7,68.7,-35.6,72.6,-19.8C76.4,-4,73.8,13.5,65.9,28.2C58,42.9,44.9,54.8,29.9,61.7C14.9,68.6,-2,70.5,-18.6,66.9C-35.2,63.3,-51.5,54.2,-61.8,40.5C-72.1,26.8,-76.4,8.5,-73.6,-8.2C-70.8,-24.9,-60.9,-40,-47.6,-48.7C-34.3,-57.4,-17.2,-59.7,0.3,-60.1C17.7,-60.5,35.4,-59,45.2,-58.3Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}
