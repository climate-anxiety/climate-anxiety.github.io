import React, { useState } from 'react';
import { useSurveyContext } from '../contexts/SurveyContext';
import { ConfirmationDialog } from './ConfirmationDialog';

export const NavigationControls: React.FC = () => {
  const { 
    state,
    canGoBack, 
    goBack, 
    clearSurvey 
  } = useSurveyContext();
  
  const [showClearDialog, setShowClearDialog] = useState(false);
  
  const handleClearSurvey = () => {
    setShowClearDialog(true);
  };

  const confirmClear = () => {
    clearSurvey();
    setShowClearDialog(false);
  };

  return (
    <>
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-4 shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className="px-4 py-2 text-gray-200 hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 rounded-md hover:bg-gray-800"
          >
            ← Back
          </button>
          
          <div className="text-sm text-gray-200">
            {state.currentPaths.length} active path{state.currentPaths.length !== 1 ? 's' : ''}
            {state.isCompleted && (
              <span className="ml-2 text-green-400 font-medium">• Complete</span>
            )}
          </div>
          
          {state.isCompleted ? (
            <div className="space-x-3">
              <span className="text-green-400 font-medium">Survey Complete!</span>
              <button
                onClick={handleClearSurvey}
                className="px-4 py-2 bg-climate-teal-600 text-white rounded-md hover:bg-climate-teal-700"
              >
                Start New Survey
              </button>
            </div>
          ) : (
            <button
              onClick={handleClearSurvey}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear & Restart
            </button>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showClearDialog}
        title="Clear Survey Data"
        message="This will permanently delete all your responses and start the survey over. Are you sure you want to continue?"
        onConfirm={confirmClear}
        onCancel={() => setShowClearDialog(false)}
        confirmText="Clear Data"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};
