
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export const CustomToolTip = ({ active, payload, label }: CustomTooltipProps) => {

    console.log('ACTIVE:', active)
    console.log('PAYLOAD', payload)
    console.log('LABEL:', label)

  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-amber-500/50 p-3 rounded shadow-xl">
          <p className="text-amber-400 font-bold">Year: {label}</p>
        {
            payload.map(d => 
                <div>
                    <p className="text-white text-sm">
                    <div>{d.name} @ <span className="font-semibold">{d.value}°C</span> </div>                   
                    </p>
                </div>

            )
        }
      </div>
    );
  }
  return null;

};