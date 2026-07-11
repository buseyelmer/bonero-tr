export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-24" aria-busy="true" aria-live="polite">
      <span className="sr-only">Sayfa yükleniyor</span>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="h-3 w-24 animate-pulse rounded bg-bonero-dark/10" />
            <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-bonero-dark/10" />
            <div className="h-10 w-4/5 max-w-sm animate-pulse rounded-lg bg-bonero-dark/10" />
            <div className="mt-2 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-bonero-dark/8" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-bonero-dark/8" />
            </div>
            <div className="flex gap-3 pt-4">
              <div className="h-11 w-32 animate-pulse rounded-lg bg-bonero-green/25" />
              <div className="h-11 w-32 animate-pulse rounded-lg bg-bonero-dark/10" />
            </div>
          </div>
          <div className="mx-auto aspect-square w-full max-w-sm animate-pulse rounded-full bg-bonero-dark/5" />
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="glass-panel h-40 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
