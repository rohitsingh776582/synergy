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
    "inline-flex items-center justify-center font-bold rounded-none transition-all duration-300 shadow-sm active:scale-95";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };

  const variantClasses = {
    primary:
      "bg-[#5b176e] text-white hover:bg-[#461056] shadow-[0_6px_20px_rgba(91,23,110,0.25)] hover:shadow-lg",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900",
    outline:
      "border-2 border-[#5b176e] text-[#5b176e] hover:bg-[#5b176e] hover:text-white",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="ml-2 w-4 h-4" />}
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
