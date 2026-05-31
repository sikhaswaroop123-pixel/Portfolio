import Image from "next/image";

type PlaceholderImageProps = {
  label: string;
  aspect?: "hero" | "wide" | "tall" | "square" | "city";
  src?: string;
  className?: string;
  priority?: boolean;
};

const aspectClasses = {
  hero: "aspect-[4/5] md:aspect-[3/4]",
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  city: "aspect-square max-w-[120px]",
};

export function PlaceholderImage({
  label,
  aspect = "wide",
  src,
  className = "",
  priority = false,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden bg-card ${aspectClasses[aspect]} ${className}`}
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-card border border-white/5 ${aspectClasses[aspect]} ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span
        className="absolute top-3 left-3 w-3 h-3 border-t border-l border-accent"
        aria-hidden
      />
      <span
        className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-accent/60"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <p className="section-label text-center text-muted/80">{label}</p>
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #faf5ee 0, #faf5ee 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
    </div>
  );
}
