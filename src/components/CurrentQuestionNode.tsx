import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';
import { useSurveyContext } from '../contexts/SurveyContext';
import { ScaleQuestion } from './questions/ScaleQuestion';
import { BinaryQuestion } from './questions/BinaryQuestion';
import { SingleSelectQuestion } from './questions/SingleSelectQuestion';
import { MultiSelectQuestion } from './questions/MultiSelectQuestion';

const CurrentQuestionNode: React.FC<NodeProps> = ({ data }) => {
  const question = data.question;
  const { answerQuestion } = useSurveyContext();
  
  if (!question) return null;

  const handleAnswer = (answers: string[], customAnswers?: string[]) => {
    console.log('Answer selected:', answers, customAnswers);
    answerQuestion(question.id, answers, customAnswers);
    
    // The survey context will handle updating the current question
    // and the flow diagram will automatically show the next question
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'scale':
        return (
          <ScaleQuestion
            question={question}
            currentAnswer={[]}
            onAnswer={handleAnswer}
          />
        );
      case 'binary':
        return (
          <BinaryQuestion
            question={question}
            currentAnswer={[]}
            onAnswer={handleAnswer}
          />
        );
      case 'single_select':
        return (
          <SingleSelectQuestion
            question={question}
            currentAnswer={[]}
            onAnswer={handleAnswer}
          />
        );
      case 'multi_select':
        return (
          <MultiSelectQuestion
            question={question}
            currentAnswers={[]}
            onAnswer={handleAnswer}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-climate-teal-500 rounded-lg shadow-lg p-4 min-w-[400px] max-w-[500px]">
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
      
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-100">
          {question.id}
        </div>
        <div className="w-2 h-2 bg-climate-teal-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-xs text-gray-300 capitalize mb-3">
        {question.type.replace('_', ' ')}
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {renderQuestion()}
      </div>
    </div>
  );
};

export default CurrentQuestionNode;
