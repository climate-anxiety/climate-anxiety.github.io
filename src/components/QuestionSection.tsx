import React from 'react';
import { useSurveyContext } from '../contexts/SurveyContext';
import { ScaleQuestion } from './questions/ScaleQuestion';
import { BinaryQuestion } from './questions/BinaryQuestion';
import { SingleSelectQuestion } from './questions/SingleSelectQuestion';
import { MultiSelectQuestion } from './questions/MultiSelectQuestion';

export const QuestionSection: React.FC = () => {
  const { state, answerQuestion } = useSurveyContext();

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-climate-teal-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold">Error</div>
          <p className="mt-2 text-slate-600">{state.error}</p>
        </div>
      </div>
    );
  }

  if (!state.surveyData || !state.currentQuestionId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-green-600 text-lg font-semibold">Survey Complete!</div>
          <p className="mt-2 text-slate-600">Thank you for completing the climate anxiety assessment.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = state.surveyData.questions.find(q => q.id === state.currentQuestionId);
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold">Question Not Found</div>
          <p className="mt-2 text-slate-600">The current question could not be found.</p>
        </div>
      </div>
    );
  }

  const activePath = state.currentPaths.find(p => p.isActive);
  const currentAnswer = activePath?.responses[currentQuestion.id]?.selectedAnswers;

  const handleAnswer = (answers: string[], customAnswers?: string[]) => {
    answerQuestion(currentQuestion.id, answers, customAnswers);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'scale':
        return (
          <ScaleQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />
        );
      case 'binary':
        return (
          <BinaryQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />
        );
      case 'single_select':
        return (
          <SingleSelectQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />
        );
      case 'multi_select':
        return (
          <MultiSelectQuestion
            question={currentQuestion}
            currentAnswers={currentAnswer}
            onAnswer={handleAnswer}
          />
        );
      default:
        return (
          <div className="text-center text-slate-600">
            Unknown question type: {currentQuestion.type}
          </div>
        );
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        {renderQuestion()}
      </div>
    </div>
  );
};
