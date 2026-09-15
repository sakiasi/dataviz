const stages = [
  { number: "01", label: "Air", text: "Long-run surface temperature trends are positive across the Pacific dataset." },
  { number: "02", label: "Ocean", text: "Sea-surface temperatures are rising too, reinforcing the region-wide warming signal." },
  { number: "03", label: "Sea level", text: "Water levels are rising across every territory in the sea-level dataset, but at different rates." },
  { number: "04", label: "Food", text: "Crop and livestock outcomes are mixed, showing why climate exposure is only part of the story." },
  { number: "05", label: "People & cost", text: "Disaster impacts arrive in spikes and are shaped by exposure, reporting and local resilience." },
];

const links = [
  ["Signal", "#signal"],
  ["Ocean", "#ocean"],
  ["Sea level", "#sea-level"],
  ["Food", "#food"],
  ["People & cost", "#people"],
  ["Methods", "#sources"],
];

const StoryOverview = () => {
  return (
    <section id="story-roadmap" className="story-overview">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="story-nav" aria-label="Story sections">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-eyebrow">The story in one view</p>
            <h2 className="section-display">A climate chain — not a single cause.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-stone-300">
              The physical indicators move in a consistent direction. Social and economic
              outcomes do not. That difference matters: it separates a strong climate signal
              from claims the data cannot support on its own.
            </p>
          </div>

          <div className="roadmap-grid">
            {stages.map((stage) => (
              <article key={stage.number} className="roadmap-card">
                <span>{stage.number}</span>
                <div>
                  <h3>{stage.label}</h3>
                  <p>{stage.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="evidence-note mt-10">
          <strong>How to read this story:</strong> trend lines and cross-indicator comparisons are
          descriptive evidence. They show direction and association; they do not, by themselves,
          prove that temperature caused every change in agriculture, disasters or economic loss.
        </aside>
      </div>
    </section>
  );
};

export default StoryOverview;
