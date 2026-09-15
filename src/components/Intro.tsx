import me from "../../public/me.png";

const metrics = [
  {
    value: "+0.16°C",
    label: "surface warming per decade",
    detail: "Median linear trend across 22 Pacific Island countries and territories, 1970–2025",
  },
  {
    value: "+0.16°C",
    label: "ocean warming per decade",
    detail: "Median sea-surface trend across 21 Pacific Island countries and territories, 1970–2025",
  },
  {
    value: "+4.3 mm",
    label: "sea-level rise per year",
    detail: "Median linear trend across 21 Pacific Island countries and territories, 1993–2023",
  },
];

export const IntroComponent = () => {
  return (
    <header className="story-hero">
      <div className="story-hero-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-4xl">
          <p className="story-kicker">Pacific Dataviz Challenge 2026 · Climate change</p>
          <h1 className="story-title">
            One Ocean.
            <span>Unequal Risk.</span>
          </h1>
          <p className="story-deck">
            A data story tracing a warming Pacific from the atmosphere to the ocean,
            rising seas, food systems, people and recorded disaster losses.
          </p>
          <p className="story-thesis">
            The regional climate signal is clear. The consequences are not evenly shared.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3" aria-label="Key findings">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
              <p className="metric-detail">{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
          <div className="flex items-center gap-3">
            <img
              className="h-11 w-11 rounded-full border border-white/20 object-cover"
              src={me}
              alt="Sakiasi B. Komai"
            />
            <div>
              <p className="text-sm font-semibold text-white">Sakiasi B. Komai</p>
              <p className="text-xs text-white/65">Interactive data story · 2026</p>
            </div>
          </div>
          <a className="story-cta" href="#story-roadmap">
            Follow the evidence <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default IntroComponent;
