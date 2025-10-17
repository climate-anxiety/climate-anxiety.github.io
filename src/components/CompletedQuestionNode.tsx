import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';

const CompletedQuestionNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-3 rounded-lg border-2 bg-gray-900 border-green-400 shadow-md min-w-[200px] max-w-[250px]">
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-100">
          {data.questionId}
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      <div className="text-xs text-gray-300 capitalize mb-2">
        {data.questionType.replace('_', ' ')}
      </div>
      
      {data.selectedAnswer && (
        <div className="text-xs text-green-400 truncate bg-gray-800 px-2 py-1 rounded">
          ✓ {data.selectedAnswer}
        </div>
      )}
    </div>
  );
};

export default CompletedQuestionNode;
