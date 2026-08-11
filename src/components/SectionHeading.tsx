interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  purpleUnderline?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  purpleUnderline = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 tracking-tight leading-tight ${
          purpleUnderline ? "relative pb-4 border-b-2 border-[#5b176e]" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
