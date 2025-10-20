import React from 'react';
import { type NodeProps, Handle, Position } from 'reactflow';
import { useSurveyContext } from '../contexts/SurveyContext';
import { ScaleQuestion } from './questions/ScaleQuestion';
import { BinaryQuestion } from './questions/BinaryQuestion';
import { SingleSelectQuestion } from './questions/SingleSelectQuestion';
import { MultiSelectQuestion } from './questions/MultiSelectQuestion';

const CurrentQuestionNode: React.FC<NodeProps> = ({ data }) => {
  const question = data.question;
  const { answerQuestion, state } = useSurveyContext();
  
  if (!question) return null;

  // Get current answers for this question
  const getCurrentAnswers = () => {
    const activePath = state.currentPaths.find(p => p.isActive);
    if (!activePath) return [];
    
    const response = activePath.responses[question.id];
    return response ? response.selectedAnswers : [];
  };

  const getCurrentCustomAnswers = () => {
    const activePath = state.currentPaths.find(p => p.isActive);
    if (!activePath) return [];
    
    const response = activePath.responses[question.id];
    return response ? response.customAnswers || [] : [];
  };

  const handleAnswer = (answers: string[], customAnswers?: string[]) => {
    console.log('Answer selected:', answers, customAnswers);
    answerQuestion(question.id, answers, customAnswers);
    
    // The survey context will handle updating the current question
    // and the flow diagram will automatically show the next question
  };

  const renderQuestion = () => {
    const currentAnswers = getCurrentAnswers();
    const currentCustomAnswers = getCurrentCustomAnswers();
    
    switch (question.type) {
      case 'scale':
        return (
          <ScaleQuestion
            question={question}
            currentAnswer={currentAnswers}
            onAnswer={handleAnswer}
          />
        );
      case 'binary':
        return (
          <BinaryQuestion
            question={question}
            currentAnswer={currentAnswers}
            onAnswer={handleAnswer}
          />
        );
      case 'single_select':
        return (
          <SingleSelectQuestion
            question={question}
            currentAnswer={currentAnswers}
            onAnswer={handleAnswer}
          />
        );
      case 'multi_select':
        return (
          <MultiSelectQuestion
            question={question}
            currentAnswers={currentAnswers}
            onAnswer={handleAnswer}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-climate-teal-500 rounded-lg shadow-lg p-4 w-fit min-w-[300px] max-w-[1000px]">
      <Handle type="target" position={Position.Top} id="target" />
      <Handle type="source" position={Position.Bottom} id="source" />
      
      <div className="flex items-center justify-end mb-3">
        <div className="w-2 h-2 bg-climate-teal-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {renderQuestion()}
      </div>
    </div>
  );
};

export default CurrentQuestionNode;
