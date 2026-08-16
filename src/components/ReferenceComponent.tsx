const ReferenceComponent = () => {
  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">References</h1>
      <div className="border-b border-primary"></div>

      <div className=" text-sm leading-relaxed space-y-5 list-none pl-0">
        <p className="pl-4 ">
          Berkeley Earth. (2026). <em>Global temperature report for 2025</em>.{" "}
          <a
            className=" hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://berkeleyearth.org/global-temperature-report-for-2025/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://berkeleyearth.org/global-temperature-report-for-2025/
          </a>
        </p>
        <p className="pl-4">
          IPCC. (2019).{" "}
          <em>
            Climate Change and Land: An IPCC special report on climate change,
            desertification, land degradation, sustainable land management, food
            security, and greenhouse gas fluxes in terrestrial ecosystems
          </em>{" "}
          [P.R. Shukla, J. Skea, E. Calvo Buendia, V. Masson-Delmotte, H.-O.
          Pörtner, D. C. Roberts, P. Zhai, R. Slade, S. Connors, R. van Diemen,
          M. Ferrat, E. Haughey, S. Luz, S. Neogi, M. Pathak, J. Petzold, J.
          Portugal Pereira, P. Vyas, E. Huntley, K. Kissick, M. Belkacemi, J.
          Malley, Eds.]. Cambridge University Press.{" "}
          <a
            className="hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://doi.org/10.1017/9781009157988"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://doi.org/10.1017/9781009157988
          </a>
        </p>
        <p className="pl-4 ">
          Cheng, M., McCarl, B., & Fei, C. (2022). Climate Change and Livestock
          Production: A Literature Review. Atmosphere, 13(1), 140.
          <a
            className=" hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://doi.org/10.3390/atmos13010140"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            https://doi.org/10.3390/atmos13010140
          </a>
        </p>
      </div>
    </div>
  );
};

export default ReferenceComponent;
