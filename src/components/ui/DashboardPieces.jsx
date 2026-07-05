export function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-panel border border-white/10 rounded-2xl p-5">
      <p className="text-xs font-mono text-mist uppercase tracking-wide mb-2">{label}</p>
      <p className={`font-display text-2xl ${colorClass}`}>{value}</p>
    </div>
  );
}

export function ProgressBar({ label, count, max, colorClass }) {
  const widthPercent = max > 0 ? (count / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs font-mono text-mist mb-1">
        <span>{label}</span>
        <span>{count}</span>
      </div>
      <div className="h-2 bg-panel-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${widthPercent}%` }} />
      </div>
    </div>
  );
}
