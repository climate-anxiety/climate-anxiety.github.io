import React from 'react';
import { type Question } from '../../types/survey';

interface ScaleQuestionProps {
  question: Question;
  currentAnswer?: string[];
  onAnswer: (answers: string[]) => void;
}

export const ScaleQuestion: React.FC<ScaleQuestionProps> = ({ 
  question, 
  currentAnswer, 
  onAnswer 
}) => {
  if (!question.scale) return null;

  const { min, max, labels } = question.scale;
  const scaleValues = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">
        {question.question}
      </h2>
      <div className="flex flex-wrap gap-2">
        {scaleValues.map((value, index) => (
          <button
            key={value}
            onClick={() => onAnswer([value.toString()])}
            className={`px-4 py-3 rounded-lg border-2 transition-all min-w-[80px] ${
              currentAnswer?.[0] === value.toString()
                ? 'border-climate-teal-500 bg-climate-teal-900 text-climate-teal-100'
                : 'border-gray-700 hover:border-gray-600 bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="text-sm font-medium text-gray-100">{value}</div>
            <div className="text-xs text-gray-300 mt-1">{labels[index]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
