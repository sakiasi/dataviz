
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number, color:string, name:string }>;
  label?: string;
  units?: string
}

export const CustomToolTip = ({ active, payload, label,units }: CustomTooltipProps) => {

  console.log('PAYLOAD:', units)

  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-amber-500/50 p-3 rounded shadow-xl">
          <p className="text-amber-400 font-bold">Year: {label}</p>
        {
            payload.sort((a,b) => b.value - a.value).map((d,i) => 
                <div key={i} className="flex items-center gap-2">
                    <div style={{ backgroundColor: d.color }} className="w-3 h-3 rounded-full"></div> 
                    <p className="text-white text-sm">
                      {d.name} : <span className="font-semibold">{d.value.toLocaleString()} {units}</span>                  
                    </p>
                </div>
            )
        }
      </div>
    );
  }
  return null;

};