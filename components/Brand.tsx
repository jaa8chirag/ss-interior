import Image from "next/image";

interface BrandProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export default function Brand({ size = "md", showText = false, className = "" }: BrandProps) {
  const sizeClasses = {
    sm: "h-12 w-auto",
    md: "h-20 w-auto",
    lg: "h-24 w-auto",
    xl: "h-32 w-auto",
  }[size];

  const imgHeight = {
    sm: 48,
    md: 80,
    lg: 96,
    xl: 128,
  }[size];

  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      {/* Pure Logo without any gray box, borders, or container */}
      <div className={`relative ${sizeClasses} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <Image
          src="/logo.png"
          alt="SS Interiors — Since 2016"
          width={Math.round(imgHeight * 1.18)}
          height={imgHeight}
          priority
          className="h-full w-auto object-contain filter drop-shadow-md"
          style={{ width: "auto", height: "100%" }}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-lg tracking-[0.2em] font-semibold text-fg uppercase leading-tight">
            SS Interiors
          </span>
          <span className="text-[10px] tracking-[0.35em] text-gold uppercase mt-0.5 font-sans">
            Since 2016
          </span>
        </div>
      )}
    </div>
  );
}
