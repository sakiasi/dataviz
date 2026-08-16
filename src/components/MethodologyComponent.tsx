const MethodologyComponent = () => {
  return (
    <div className=" space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Methodology</h1>

      <div className="border-b border-primary"></div>

      <div className="space-y-5 text-sm leading-relaxed">
        <div>
          <h3 className="font-semibold"> 1. Data Sources</h3>
          <ul className="list-disc decoration-primary underline pl-5 space-y-1 mt-1">
            <li className="hover:text-primary">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ST_ANOM.&pd=,&to[TIME_PERIOD]=false"
              >
                <p>Mean surface temperature anomalies</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false"
              >
                <p>Crop yield</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false"
              >
                <p>Livestock yield</p>
              </a>
            </li>
            <li className="hover:text-primary">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ALT_LAND_COVER.&pd=,&to[TIME_PERIOD]=false"
              >
                <p>Climate altering land cover index</p>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">2. Technology Stack</h3>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>
              <p>
                Development:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-primary underline"
                  href="https://react.dev/"
                >
                  React
                </a>
                ,{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-primary underline"
                  href="https://vite.dev/"
                >
                  Vite
                </a>
                ,{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-primary underline"
                  href="https://tailwindcss.com/"
                >
                  Tailwind CSS
                </a>
                , and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-primary underline"
                  href="https://ui.shadcn.com/"
                >
                  shadcn/ui components.
                </a>
              </p>
            </li>
            <li>
              <p>
                Visualizations:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-primary underline"
                  href="https://recharts.github.io/"
                >
                  Recharts
                </a>{" "}
                for rendering interactive graphs and charts.
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
