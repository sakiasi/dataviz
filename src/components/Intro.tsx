import me from "../../public/me.png";

export const IntroComponent = () => {
  return (
    <div className="flex flex-col gap-5 pt-20">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        The Pacific Climate
        <span className="block text-2xl text-primary mt-1 font-medium">
          Analyzing Regional Shifts & Socio-Economic Impact
        </span>
      </h1>

      <div className="flex items-center gap-3 pt-2  text-sm">
        <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sky-400">
          <img className="rounded-full" height={90} width={90} src={`${me}`} />
        </div>
        <div>
          <p className="font-medium ">Sakiasi B. Komai</p>
          <p className="text-xs ">Dataviz Challenge 2026</p>
        </div>
      </div>

      <ul className="space-y-4 ">
        <li>
          In this data driven essay, we will trace the cascading effects of
          global warming across the Pacific—mapping how atmospheric heating and
          ocean warming drive sea-level rise, and linking these physical shifts
          directly to agricultural decline, human displacement, and mounting
          financial losses.
        </li>
        <li>
          <strong className=" font-semibold">Limitations:</strong> We are
          analyzing observed historical trends and linear associations across
          Pacific island nations to establish directional relationships, rather
          than proving complete multi-factor causation.
        </li>
      </ul>
    </div>
  );
};

export default IntroComponent;
