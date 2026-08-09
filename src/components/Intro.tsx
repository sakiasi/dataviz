export const IntroComponent = () => {
  return (
    <div className="flex flex-col gap-5 pt-20">
      <h1 className="text-4xl font-bold text-slate-50 tracking-tight">
        The Pacific Climate
        <span className="block text-2xl text-sky-400 mt-1 font-medium">
          Analyzing Regional Shifts & Socio-Economic Impact
        </span>
      </h1>

      <div className="flex items-center gap-3 pt-2 text-slate-400 text-sm">
        <div className="h-8 w-8 rounded-full bg-sky-950 border border-sky-700/50 flex items-center justify-center font-semibold text-sky-400">
          SB
        </div>
        <div>
          <p className="font-medium text-slate-200">Sakiasi B. Komai</p>
          <p className="text-xs text-slate-500">
            2026 Data Visualization Challenge
          </p>
        </div>
      </div>

      <ul className="space-y-4 text-slate-300">
        <li>
          In this data driven essay, we will trace the cascading effects of
          global warming across the Pacific—mapping how atmospheric heating and
          ocean warming drive sea-level rise, and linking these physical shifts
          directly to agricultural decline, human displacement, and mounting
          financial losses.
        </li>
        <li>
          <strong className="text-slate-100 font-semibold">Limitations:</strong> We are analyzing long-term historical trends and variations across
          Pacific island nations rather than performing direct statistical
          causation or regression modeling between variables.
        </li>
      </ul>
    </div>
  );
};

export default IntroComponent;
