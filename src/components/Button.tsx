import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center overflow-hidden font-semibold uppercase tracking-wider rounded-none transition-transform duration-300 active:scale-95";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };

  const variantClasses = {
    primary: "bg-[#5b176e] text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border-2 border-[#5b176e] text-[#5b176e]",
  };

  const fillClasses = {
    primary: "bg-[#461056]",
    secondary: "bg-gray-300",
    outline: "bg-[#5b176e]",
  };

  const textHoverClasses = {
    primary: "",
    secondary: "group-hover:text-gray-900",
    outline: "group-hover:text-white",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 ${fillClasses[variant]} [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-[cubic-bezier(.21,1,.34,1)] group-hover:[clip-path:inset(0_0%_0_0)]`}
      />
      <span
        className={`relative z-10 inline-flex items-center transition-colors duration-500 ${textHoverClasses[variant]}`}
      >
        <span>{children}</span>
        {withArrow && (
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(.21,1,.34,1)] group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
