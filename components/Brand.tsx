import Image from "next/image";

interface BrandProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export default function Brand({ size = "md", showText = false, className = "" }: BrandProps) {
  const dimensions = {
    sm: { w: 52, h: 52, box: "w-[52px] h-[52px]" },
    md: { w: 68, h: 68, box: "w-[68px] h-[68px]" },
    lg: { w: 92, h: 92, box: "w-[92px] h-[92px]" },
    xl: { w: 120, h: 120, box: "w-[120px] h-[120px]" },
  }[size];

  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      <div
        className={`relative ${dimensions.box} overflow-hidden rounded-sm border border-gold/40 bg-[#282c30] shadow-md shadow-black/40 transition-transform duration-300 group-hover:scale-105 shrink-0`}
      >
        <Image
          src="/logo.jpg"
          alt="SS Interiors — Since 2016"
          width={dimensions.w}
          height={dimensions.h}
          priority
          className="h-full w-full object-cover"
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
