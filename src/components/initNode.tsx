export const initialNodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 160, y: 0 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">The Energy Source is the Sun</h3>
          <p className="text-xs text-gray-600">Solar energy travels to Earth as short-wave radiation, warming the surface.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 280, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
  {
    id: '2',
    position: { x: 160, y: 140 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">The Conversion to Heat</h3>
          <p className="text-xs text-gray-600">The ground absorbs energy and re-emits it as long-wave infrared radiation.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 280, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
  {
    id: '3',
    position: { x: 160, y: 280 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">The "Trapping" Mechanism</h3>
          <p className="text-xs text-gray-600">Greenhouse gases (CO2, methane, water vapor) intercept the heat.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 280, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
  {
    id: '4',
    position: { x: -30, y: 440 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">Absorption</h3>
          <p className="text-xs text-gray-600">GHG molecules have a complex structure allowing them to absorb infrared heat.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 250, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
  {
    id: '5',
    position: { x: 380, y: 440 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">Re-radiation</h3>
          <p className="text-xs text-gray-600">They vibrate and re-radiate energy in all directions, including back down.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 250, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
  {
    id: '6',
    position: { x: 160, y: 610 },
    data: { 
      label: (
        <div>
          <h3 className="font-bold text-base mb-1">The Accumulation</h3>
          <p className="text-xs text-gray-600">Heat builds up in the lower atmosphere and oceans, driving global warming.</p>
        </div>
      ) 
    },
    style: { borderRadius: '12px', padding: '14px', width: 280, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e4-6', source: '4', target: '6', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
];