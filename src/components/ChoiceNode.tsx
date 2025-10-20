import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';

const ChoiceNode: React.FC<NodeProps> = ({ data }) => {
  const handleChoiceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data?.onChoiceClick && data.choiceId && data.questionId) {
      data.onChoiceClick(data.choiceId, data.questionId);
    }
  };

  return (
    <div 
      className={`choice-node relative overflow-visible px-3 py-2 rounded-lg border-2 cursor-pointer transition-all w-fit min-w-[40px] text-center ${
        data?.isSelected
          ? 'border-climate-teal-500 bg-climate-teal-50 text-climate-teal-900'
          : 'border-slate-300 bg-white hover:bg-climate-teal-50 hover:border-climate-teal-400'
      }`}
      onClick={handleChoiceClick}
    >
      <Handle type="source" position={Position.Right} id="source" />
      
      <div className="text-xs font-medium text-slate-700 break-words leading-tight">
        {data.choiceLabel}
      </div>
    </div>
  );
};

export default ChoiceNode;
