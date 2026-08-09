
const MethodologyComponent = () => {
  return (
    <div className=" space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">
        Methodology
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="space-y-5 text-sm leading-relaxed">
        <div>
          <h3 className="font-semibold">1. Data Sources</h3>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                <strong>Crop yield - disaggregated</strong>
              </a>
            </li>
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                <strong>Livestock yield - disaggregated</strong>
              </a>
            </li>
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.SST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                <strong>Mean sea surface temperature anomalies</strong>
              </a>
            </li>
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                <strong>Mean surface temperature anomalies</strong>
              </a>
            </li>
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AFFCT.........&pd=,&to[TIME_PERIOD]=false&lb=bt">
                <strong>
                  Number of directly affected persons attributed to disasters
                </strong>
              </a>
            </li>
            <li>
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AALT...._T.....&pd=,&to[TIME_PERIOD]=false">
                <strong>Direct disaster economic loss</strong>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">2. Technology Stack</h3>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>
              <strong>Development:</strong> React, Vite, Tailwind CSS, and
              shadcn/ui components.
            </li>
            <li>
              <strong>Visualizations:</strong> Recharts for rendering
              interactive graphs and charts.
            </li>
            <li>
              <strong>Source Code:</strong> Available on GitHub at{" "}
              <a
                className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
                href="https://github.com/sakiasi/dataviz.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/sakiasi/dataviz.git
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MethodologyComponent;
