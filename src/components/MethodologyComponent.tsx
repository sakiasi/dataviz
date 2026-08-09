const MethodologyComponent = () => {
  return (
    <div className=" space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Methodology</h1>

      <div className="border-b border-slate-800"></div>

      <div className="space-y-5 text-sm leading-relaxed">
        <div>
          <h3 className="font-semibold">Data Sources</h3>
          <ul className="list-disc decoration-primary underline pl-5 space-y-1 mt-1">
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                <p>Crop yield - disaggregated</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                <p>Livestock yield - disaggregated</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.SST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                <p>Mean sea surface temperature anomalies</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                <p>Mean surface temperature anomalies</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AFFCT.........&pd=,&to[TIME_PERIOD]=false&lb=bt">
                <p>
                  Number of directly affected persons attributed to disasters
                </p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AALT...._T.....&pd=,&to[TIME_PERIOD]=false">
                <p>Direct disaster economic loss</p>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">2. Technology Stack</h3>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>
              <p>Development: React, Vite, Tailwind CSS, and shadcn/ui
              components.
              </p>
            </li>
            <li>
              <p>
                Visualizations: Recharts for rendering interactive graphs and
                charts.
              </p>
            </li>
            <li>
              <p>
                Source Code: Available on GitHub at{" "}
                <a
                  className=" hover:text-primary transition-colors underline decoration-primary underline-offset-2"
                  href="https://github.com/sakiasi/dataviz.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/sakiasi/dataviz.git
                </a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MethodologyComponent;
