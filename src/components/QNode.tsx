import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';

interface QNodeProps extends NodeProps {
  data: {
    questionId: string;
    questionText: string;
    isSelected: boolean;
    onQuestionClick: (questionId: string) => void;
  };
}

const QNode: React.FC<QNodeProps> = ({ data }) => {
  const { questionId, questionText, isSelected, onQuestionClick } = data;

  const handleQuestionClick = (e: React.MouseEvent) => {
    // Only handle click if it's not on a choice node
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.choice-node')) {
      return;
    }
    onQuestionClick(questionId);
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 cursor-pointer transition-all min-w-[300px] max-w-[800px] h-full overflow-visible ${
        isSelected
          ? 'border-climate-teal-500 bg-gray-900 shadow-lg ring-2 ring-climate-teal-200'
          : 'border-gray-700 bg-gray-900 hover:border-gray-600'
      }`}
      onClick={handleQuestionClick}
    >
      <Handle type="target" position={Position.Left} id="target" />

      {/* Flex row: question text (left) and vertical choices column (right) */}
      <div className="flex h-full items-center gap-4">
        {/* Left: Question text */}
        <div className="flex-1 h-full flex items-center text-sm font-medium text-gray-100">
          {questionText}
        </div>

        {/* Right: Placeholder container where ChoiceNodes will be positioned by React Flow */}
        <div className="flex flex-col gap-2 min-w-[120px]" style={{ pointerEvents: 'none' }}>
          {/* ChoiceNode children are rendered as separate nodes with parent extent; this column reserves layout space. */}
        </div>
      </div>
    </div>
  );
};

export default QNode;
