export default function Spinner({ size = "md", label = "Chargement..." }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div
        className={`${sizes[size]} rounded-full border-white/10 border-t-gold animate-spin`}
      />
      {label && (
        <p className="text-xs font-mono text-mist uppercase tracking-wide">
          {label}
        </p>
      )}
    </div>
  );
}