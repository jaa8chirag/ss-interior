import Image from "next/image";

interface BrandProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export default function Brand({
  size = "md",
  showText = false,
  className = "",
}: BrandProps) {
  // Dimensions matching the exact logo aspect ratio (220 x 182)
  const dimensions = {
    sm: { w: 58, h: 48, cls: "h-12 w-[58px]" },
    md: { w: 82, h: 68, cls: "h-[68px] w-[82px]" },
    lg: { w: 97, h: 80, cls: "h-20 w-[97px]" },
    xl: { w: 112, h: 92, cls: "h-[92px] w-[112px]" },
  }[size];

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Exact Original Luxury Logo Plaque */}
      <div
        className={`relative ${dimensions.cls} shrink-0 overflow-hidden rounded-[2px] shadow-sm transition-transform duration-300 group-hover:scale-105`}
      >
        <Image
          src="/ss-exact-logo.png"
          alt="SS Interiors — Since 2016"
          width={dimensions.w * 2}
          height={dimensions.h * 2}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-serif text-lg tracking-[0.22em] font-semibold text-fg uppercase leading-tight">
            SS Interiors
          </span>
          <span className="text-[10px] tracking-[0.38em] text-gold uppercase mt-0.5 font-sans font-medium">
            Since 2016
          </span>
        </div>
      )}
    </div>
  );
}
