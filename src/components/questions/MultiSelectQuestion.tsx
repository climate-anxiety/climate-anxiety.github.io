import React, { useState } from 'react';
import { type Question } from '../../types/survey';

interface MultiSelectQuestionProps {
  question: Question;
  currentAnswers?: string[];
  onAnswer: (answers: string[], customAnswers?: string[]) => void;
}

export const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({ 
  question, 
  currentAnswers = [], 
  onAnswer 
}) => {
  const [customInput, setCustomInput] = useState('');
  
  if (!question.options) return null;

  const handleOptionToggle = (optionValue: string, checked: boolean) => {
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...currentAnswers, optionValue];
    } else {
      newAnswers = currentAnswers.filter(answer => answer !== optionValue);
    }
    onAnswer(newAnswers);
  };

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      onAnswer([...currentAnswers, 'custom'], [customInput.trim()]);
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">
        {question.question}
      </h2>
      <div className="grid gap-2">
        {question.options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer bg-gray-800">
            <input
              type="checkbox"
              checked={currentAnswers.includes(option.value)}
              onChange={(e) => handleOptionToggle(option.value, e.target.checked)}
              className="w-4 h-4 text-climate-teal-600 border-gray-600 rounded focus:ring-climate-teal-500 bg-gray-900"
            />
            <span className="text-gray-100 font-medium">{option.label}</span>
          </label>
        ))}
        
        {question.allowCustom && (
          <div className="mt-4 space-y-2 p-3 border border-gray-700 rounded-lg bg-gray-800">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={customInput.length > 0}
                readOnly
                className="w-4 h-4 text-climate-teal-600"
              />
              <span className="text-gray-100 font-medium">Other (please specify):</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                maxLength={question.customLimit || 100}
                placeholder="Enter your custom response..."
                className="flex-1 px-3 py-2 border border-gray-600 rounded-md focus:ring-climate-teal-500 focus:border-climate-teal-500 bg-gray-900 text-gray-100"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
              />
              <button
                onClick={handleCustomSubmit}
                disabled={!customInput.trim()}
                className="px-4 py-2 bg-climate-teal-600 text-white rounded-md hover:bg-climate-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            <div className="text-xs text-gray-300">
              {customInput.length}/{question.customLimit || 100} characters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
