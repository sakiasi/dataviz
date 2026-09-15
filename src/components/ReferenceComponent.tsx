const sources = [
  {
    title: "Surface temperature anomalies",
    href: "https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ST_ANOM.&pd=,&to[TIME_PERIOD]=false",
    source: "Pacific Data Hub / SPC",
  },
  {
    title: "Sea-surface temperature anomalies",
    href: "https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.SST_ANOM.&pd=,&to[TIME_PERIOD]=false",
    source: "Pacific Data Hub / SPC",
  },
  {
    title: "Sea-level anomalies",
    href: "https://stats.pacificdata.org/",
    source: "Pacific Data Hub / SPC",
  },
  {
    title: "Crop and livestock production",
    href: "https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false",
    source: "Pacific Data Hub / SPC",
  },
  {
    title: "People directly affected by disasters",
    href: "https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AFFCT.........&pd=,&to[TIME_PERIOD]=false&lb=bt",
    source: "Pacific Data Hub / UNDRR",
  },
  {
    title: "Direct disaster economic loss",
    href: "https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AALT...._T.....&pd=,&to[TIME_PERIOD]=false",
    source: "Pacific Data Hub / UNDRR",
  },
];

const ReferenceComponent = () => {
  return (
    <div className="max-w-4xl">
      <p className="section-eyebrow">Data provenance</p>
      <h2 className="chapter-title">Primary datasets</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-stone-300">
        The interactive story is built from official Pacific Data Hub datasets supplied through
        the Pacific Community (SPC), with disaster indicators sourced from UNDRR reporting.
      </p>

      <div className="source-list mt-8">
        {sources.map((source, index) => (
          <a key={source.title} href={source.href} target="_blank" rel="noopener noreferrer" className="source-row">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{source.title}</strong>
              <small>{source.source}</small>
            </div>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>

      <div className="mt-10 text-sm leading-6 text-slate-600 dark:text-stone-300">
        <p>
          Context references include Berkeley Earth’s 2025 global temperature report; Cheng et al.
          (2019), <em>How fast are the oceans warming?</em>; Nunn (2013), <em>The end of the Pacific?</em>;
          Khan et al. (2022) on crop heat stress; Cheng, McCarl & Fei (2022) on climate and livestock;
          and UNDRR Pacific disaster-resilience reporting.
        </p>
        <p className="mt-3">
          Nunn (2013): <a className="story-link" href="https://doi.org/10.1111/sjtg.12021" target="_blank" rel="noopener noreferrer">doi.org/10.1111/sjtg.12021</a>
        </p>
      </div>
    </div>
  );
};

export default ReferenceComponent;
