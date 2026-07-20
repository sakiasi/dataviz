export default function EnergyTimeline() {
  const steps = [
    {
      title: "The Energy Source is the Sun",
      description:
        "The heat in our climate system originally comes from the Sun. Solar energy travels to Earth as short-wave radiation (like visible light). Most of this energy passes right through the atmosphere and hits the ground, warming the Earth's surface.",
    },
    {
      title: "The Conversion to Heat",
      description:
        "Once the ground absorbs this solar energy, it warms up and re-emits that energy as long-wave infrared radiation (what we feel as heat). This is the same way a hot stove or a radiator releases energy.",
    },
    {
      title: 'The "Trapping" Mechanism',
      description:
        "This is where greenhouse gases (like CO2, methane, and water vapor) come in:",
    },
    {
      title: "Absorption",
      description:
        "Unlike nitrogen and oxygen (which make up most of the atmosphere and don't interact much with infrared radiation), GHG molecules have a complex structure that allows them to absorb this rising infrared heat.",
    },
    {
      title: "Re-radiation",
      description:
        "Once they absorb this heat, they don't hold it forever. They vibrate and re-radiate that energy in all directions—including back down toward the Earth's surface.",
    },
    {
      title: "The Accumulation",
      description:
        "Because some of this heat is sent back to the surface instead of escaping into space, it builds up in the lower atmosphere and the oceans, leading to global warming.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="relative border-l-2 border-dashed border-amber-300 ml-4 sm:ml-8 space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-8 sm:pl-12 group">
            {/* Solar/Warmth Styled Node Badge */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-md ring-4 ring-white group-hover:bg-amber-600 transition-colors">
              {index + 1}
            </div>

            {/* Clean, Executive Card Container */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg border border-slate-800 hover:border-amber-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Phase 0{index + 1}
                </span>
                <div className="h-1.5 w-12 rounded-full" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 tracking-wide">
                {step.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}