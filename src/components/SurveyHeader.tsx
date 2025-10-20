import React from 'react';
import { useSurveyContext } from '../contexts/SurveyContext';

export const SurveyHeader: React.FC = () => {
  const { state, startSurvey, hasStarted } = useSurveyContext();
  
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            {state.surveyData?.title || 'Climate Anxiety Assessment Survey'}
          </h1>
          <p className="text-gray-300 mt-1">
            {state.surveyData?.description || 'A branching survey to assess levels and types of climate-related anxiety'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-300">
            {state.isLoading && 'Loading...'}
            {state.error && 'Error occurred'}
            {!state.isLoading && !state.error && !state.isCompleted && hasStarted && 'In Progress'}
            {state.isCompleted && 'Complete'}
          </div>
          {!state.isLoading && !state.error && !hasStarted && (
            <button
              onClick={startSurvey}
              className="px-4 py-2 rounded-md bg-climate-teal-600 hover:bg-climate-teal-500 text-white font-medium"
            >
              Start the survey
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
