export function EmptyState({ title, subtitle }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 border border-dashed border-white/15 rounded-2xl">
      <div className="w-12 h-12 rounded-full border-2 border-mist/40 flex items-center justify-center mb-4 text-mist">
        ?
      </div>
      <p className="font-display text-xl mb-1">{title}</p>
      <p className="text-sm text-mist max-w-xs">{subtitle}</p>
    </div>
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 border border-vermilion/30 bg-vermilion/5 rounded-2xl">
      <p className="font-display text-xl text-vermilion mb-1">Impossible de charger les données</p>
      <p className="text-sm text-mist max-w-xs mb-4">
        La requête vers l'API a échoué. Vérifiez votre connexion et réessayez.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-mono border border-vermilion text-vermilion px-4 py-2 rounded-full hover:bg-vermilion hover:text-ink transition"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

export function SkeletonGrid({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="skeleton h-40 rounded-xl" />
          <div className="skeleton h-3 w-3/4 rounded mt-3" />
          <div className="skeleton h-3 w-1/2 rounded mt-2" />
        </div>
      ))}
    </>
  );
}
