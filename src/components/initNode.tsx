export const initialNodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">The Energy Source is the Sun</h3>
          <p className="text-sm">Solar energy travels to Earth as short-wave radiation, warming the surface.</p>
        </div>
      ) 
    },
    style: { borderRadius: '8px', padding: '10px', width: 280 }
  },
  {
    id: '2',
    position: { x: 250, y: 150 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">The Conversion to Heat</h3>
          <p className="text-sm">The ground absorbs energy and re-emits it as long-wave infrared radiation.</p>
        </div>
      ) 
    },
    style: {  borderRadius: '8px', padding: '10px', width: 280 }
  },
  {
    id: '3',
    position: { x: 250, y: 300 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">The "Trapping" Mechanism</h3>
          <p className="text-sm">Greenhouse gases (CO2, methane, water vapor) intercept the heat.</p>
        </div>
      ) 
    },
    style: {  borderRadius: '8px', padding: '10px', width: 280 }
  },
  {
    id: '4',
    position: { x: 100, y: 450 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">Absorption</h3>
          <p className="text-sm">GHG molecules have a complex structure allowing them to absorb infrared heat.</p>
        </div>
      ) 
    },
    style: {  borderRadius: '8px', padding: '10px', width: 250 }
  },
  {
    id: '5',
    position: { x: 400, y: 450 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">Re-radiation</h3>
          <p className="text-sm">They vibrate and re-radiate energy in all directions, including back down.</p>
        </div>
      ) 
    },
    style: {  borderRadius: '8px', padding: '10px', width: 250 }
  },
  {
    id: '6',
    position: { x: 250, y: 600 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-lg">The Accumulation</h3>
          <p className="text-sm">Heat builds up in the lower atmosphere and oceans, driving global warming.</p>
        </div>
      ) 
    },
    style: {  borderRadius: '8px', padding: '10px', width: 280 }
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6', animated: true },
];