import { useCrop } from "../services/getData";

const CropComponent = () => {
  const { uniqueGEOPict } = useCrop();

  return (
    <div className="grid grid-cols-5">
      {uniqueGEOPict.map((d, i) => (
          <p className="p-2 text-sm text-center hover:cursor-pointer hover:bg-slate-600 bg-slate-800 border border-slate-500">{d}</p>
      ))}
    </div>
  );
};

export default CropComponent;
