import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  isArabic?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = false,
  isArabic = true,
  size = 'md',
}) => {
  // Height configurations
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-18',
  };

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      {/* Exact Vector recreation of HARBIXCHANGE logo */}
      <svg
        viewBox="0 0 680 140"
        className={`${heightClasses[size]} w-auto max-w-full drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="HARBIXCHANGE Logo"
      >
        <defs>
          {/* Subtle gradients to add polish while respecting exact brand colors */}
          <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b4d73b" />
            <stop offset="100%" stopColor="#9ec92b" />
          </linearGradient>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b0e8" />
            <stop offset="100%" stopColor="#0097c7" />
          </linearGradient>
        </defs>

        {/* --- LEFT BLOCK: HARBI in Lime --- */}
        {/* Polygon with right chevron cutout for the X */}
        <path
          d="M 10 15 
             L 260 15 
             L 260 30 
             L 282 70 
             L 260 110 
             L 260 125 
             L 10 125 
             Z"
          fill="url(#limeGrad)"
          stroke="#9ec92b"
          strokeWidth="1.5"
        />

        {/* Text "HARBI" in bold uppercase white */}
        <text
          x="135"
          y="88"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="56"
          letterSpacing="4"
          textAnchor="middle"
        >
          HARBI
        </text>

        {/* --- RIGHT BLOCK: CHANGE in Cyan --- */}
        {/* Polygon with left chevron cutout for the X */}
        <path
          d="M 420 15 
             L 670 15 
             L 670 125 
             L 420 125 
             L 420 110 
             L 398 70 
             L 420 30 
             Z"
          fill="url(#cyanGrad)"
          stroke="#0097c7"
          strokeWidth="1.5"
        />

        {/* Text "CHANGE" in bold uppercase white */}
        <text
          x="545"
          y="88"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="56"
          letterSpacing="3"
          textAnchor="middle"
        >
          CHANGE
        </text>

        {/* --- CENTER "X" ARROWS --- */}
        {/* Top Arrow pointing DOWN (Cyan) */}
        <g className="transition-transform duration-300">
          <path
            d="M 330 0 
               L 350 0 
               L 350 35 
               L 362 35 
               L 340 64 
               L 318 35 
               L 330 35 
               Z"
            fill="#00A3DA"
          />
        </g>

        {/* Bottom Arrow pointing UP (Lime) */}
        <g className="transition-transform duration-300">
          <path
            d="M 330 140 
               L 350 140 
               L 350 105 
               L 362 105 
               L 340 76 
               L 318 105 
               L 330 105 
               Z"
            fill="#A6CE39"
          />
        </g>
      </svg>

      {showSubtitle && (
        <span className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium tracking-normal whitespace-nowrap">
          {isArabic ? 'شركة مطير عواد الحربي وشركاؤه للصرافة' : 'Mutair Awwad Al-Harbi & Partners Exchange'}
        </span>
      )}
    </div>
  );
};
