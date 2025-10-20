import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';
import { type Question } from '../types/survey';

const CompletedQuestionNode: React.FC<NodeProps> = ({ data }) => {
  const question: Question = data.question;
  const selectedAnswers: string[] = data.selectedAnswers || [];
  const customAnswers: string[] = data.customAnswers || [];

  const renderOptions = () => {
    if (!question) return null;

    switch (question.type) {
      case 'scale':
        if (!question.scale) return null;
        const { min, max, labels } = question.scale;
        const scaleValues = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        
        return (
          <div className="flex flex-wrap gap-1">
            {scaleValues.map((value, index) => (
              <div
                key={value}
                className={`px-2 py-1 rounded text-xs min-w-[40px] text-center ${
                  selectedAnswers.includes(value.toString())
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                <div className="font-medium">{value}</div>
                <div className="text-xs opacity-75">{labels[index]}</div>
              </div>
            ))}
          </div>
        );

      case 'binary':
      case 'single_select':
        if (!question.options) return null;
        return (
          <div className="flex flex-row gap-1">
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`px-2 py-1 rounded text-xs flex-1 text-center min-w-0 ${
                  selectedAnswers.includes(option.value)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                <div className="break-words leading-relaxed">
                  {selectedAnswers.includes(option.value) && '✓ '}
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        );

      case 'multi_select':
        if (!question.options) return null;
        return (
          <div className="space-y-2">
            <div className="flex flex-row gap-1">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`px-2 py-1 rounded text-xs flex-1 text-center min-w-0 ${
                    selectedAnswers.includes(option.value)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <div className="break-words leading-relaxed">
                    {selectedAnswers.includes(option.value) && '✓ '}
                    {option.label}
                  </div>
                </div>
              ))}
            </div>
            {question.allowCustom && customAnswers.length > 0 && (
              <div className="pt-2 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-1">Custom responses:</div>
                <div className="flex flex-row gap-1">
                  {customAnswers.map((custom, index) => (
                    <div key={index} className="px-2 py-1 rounded text-xs bg-green-600 text-white flex-1 text-center">
                      ✓ {custom}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-3 rounded-lg border-2 bg-gray-900 border-green-400 shadow-md w-fit min-w-[200px] max-w-[800px]">
      <Handle type="target" position={Position.Top} id="target" />
      <Handle type="source" position={Position.Bottom} id="source" />
      
      <div className="flex items-center justify-end mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      <div className="text-sm text-gray-200 mb-3 line-clamp-2">
        {question?.question}
      </div>
      
      <div className="max-h-[200px] overflow-y-auto">
        {renderOptions()}
      </div>
    </div>
  );
};

export default CompletedQuestionNode;
