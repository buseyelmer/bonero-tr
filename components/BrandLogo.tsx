import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  /** `dark` wraps the logo on a light surface for contrast on dark footers */
  variant?: "default" | "on-dark";
  priority?: boolean;
};

export default function BrandLogo({
  className = "",
  variant = "default",
  priority = false,
}: BrandLogoProps) {
  const image = (
    <Image
      src="/boneroLogo.png"
      alt="Bonero"
      width={160}
      height={40}
      priority={priority}
      className={`h-8 w-auto object-contain object-left sm:h-9 ${className}`}
    />
  );

  if (variant === "on-dark") {
    return (
      <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
        {image}
      </span>
    );
  }

  return image;
}
