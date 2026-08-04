import SeaChart from "./SeaChart";



export default function SeaComponent() {
  return (
    <div className="text-slate-100 space-y-5">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Is Our Ocean Warming Up?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          According to
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.science.org/doi/10.1126/science.aav7619"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trenberth, K. E. (2019)
          </a>
          , The ocean acts as the Earth’s thermal buffer, absorbing the vast
          majority of excess atmospheric heat. Consequently, rising mean surface
          temperatures translate directly into warmer oceans, establishing a
          clear, ongoing trend in sea surface temperature anomalies.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Sea Surface Temperature Anomalies Over Time
        </h2>
      </div>

      <SeaChart/>

      <p className="text-xs text-slate-400 italic">
        Data from Surface Temperature anomalies.csv and Sea Level Anomalies.csv
      </p>

      <div className="text-slate-300">
        Data shows annual temperature variations and thermal anomaly trends.
      </div>
    </div>
  );
}
