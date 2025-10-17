import React from 'react';
import { type Question } from '../../types/survey';

interface BinaryQuestionProps {
  question: Question;
  currentAnswer?: string[];
  onAnswer: (answers: string[]) => void;
}

export const BinaryQuestion: React.FC<BinaryQuestionProps> = ({ 
  question, 
  currentAnswer, 
  onAnswer 
}) => {
  if (!question.options) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">
        {question.question}
      </h2>
      <div className="grid gap-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer([option.value])}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              currentAnswer?.[0] === option.value
                ? 'border-climate-teal-500 bg-climate-teal-900 text-climate-teal-100'
                : 'border-gray-700 hover:border-gray-600 bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <span className="text-gray-100 font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
