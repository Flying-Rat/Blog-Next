import Image from "next/image";

interface BrandLogoProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ width, height, alt, className, priority }: BrandLogoProps) {
  const classes = ["w-auto", className].filter(Boolean).join(" ");

  return (
    <>
      <Image
        src="/fr_horizontal_black.png"
        alt={alt}
        width={width}
        height={height}
        className={`logo-dark ${classes}`}
        priority={priority}
      />
      <Image
        src="/fr_horizontal_white.png"
        alt={alt}
        width={width}
        height={height}
        className={`logo-light ${classes}`}
        priority={priority}
      />
    </>
  );
}
