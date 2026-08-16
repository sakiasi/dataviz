import me from "../../public/me.png";

export const IntroComponent = () => {
  return (
    <div className="flex flex-col gap-6 pt-20 max-w-3xl mx-auto px-4">
      {/* Title Header */}
      <h1 className="text-4xl font-bold tracking-tight text-center text-slate-900 dark:text-white">
        Cascading Currents
        <span className="block text-2xl text-primary mt-2 font-semibold">
          Mapping Heat, Land Cover, and Agricultural Toll in the Pacific
        </span>
      </h1>

      {/* Author Meta */}
      <div className="flex items-center justify-center gap-3 pt-2 text-sm">
        <div className="h-11 w-11 rounded-full overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={me}
            alt="Sakiasi B. Komai"
          />
        </div>
        <div className="text-left">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Sakiasi B. Komai
          </p>
          <p className="text-xs text-muted-foreground">
            Dataviz Challenge 2026
          </p>
        </div>
      </div>

      {/* Intro Narrative & Limitations */}
      <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed pt-4 border-t border-slate-100 dark:border-slate-800">
        <p>
          As global temperatures reach historic highs, a critical question
          emerges across the region: Does atmospheric heating threaten Pacific
          Island agriculture equally, or does it divide the territory into
          resilience and risk?
        </p>

        <p className="text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200/60 dark:border-slate-800">
          <strong className="font-semibold text-slate-900 dark:text-slate-100">
            Limitations:
          </strong>{" "}
          This analysis highlights historical regional trajectories to
          illustrate macro-level systemic trends rather than asserting
          single-variable causality.
        </p>
      </div>
    </div>
  );
};

export default IntroComponent;