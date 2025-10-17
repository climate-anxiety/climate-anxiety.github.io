import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';

const ChoiceNode: React.FC<NodeProps> = ({ data }) => {
  const handleChoiceClick = () => {
    // This will be handled by the parent component
    console.log('Choice selected:', data.choiceValue);
  };

  return (
    <div 
      className="px-3 py-2 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-climate-teal-50 border-slate-300 hover:border-climate-teal-400 min-w-[120px] max-w-[150px] text-center"
      onClick={handleChoiceClick}
    >
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
      
      <div className="text-xs font-medium text-slate-700 truncate">
        {data.choiceLabel}
      </div>
    </div>
  );
};

export default ChoiceNode;
