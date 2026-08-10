
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number, color:string, name:string }>;
  label?: string;
  units?: string
}

export const CustomToolTip = ({ active, payload, label,units }: CustomTooltipProps) => {

  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-foreground border border-primary p-3 rounded shadow-xl">
          <p className="text-primary font-bold">Year: {label}</p>
        {
            payload.sort((a,b) => b.value - a.value).map((d,i) => 
                <div key={i} className="flex items-center gap-2">
                    <div style={{ backgroundColor: d.color }} className="w-3 h-3 rounded-full"></div> 
                    <p className=" text-sm">
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