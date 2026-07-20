import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges, initialNodes } from './initNode';

export default function ClimateProcessFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className='h-100 md:h-100 w-full' style={{ touchAction: 'pan-y' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        panOnDrag={false}
        panOnScroll={false}
        selectionOnDrag={false}
        preventScrolling={false}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls showZoom={false} showFitView={false} showInteractive={false} />
        <Background gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}