import { type FC } from 'react';
import { SurveyProvider } from './contexts/SurveyContext';
import { SurveyHeader } from './components/SurveyHeader';
import { FlowDiagram } from './components/FlowDiagram';
import { NavigationControls } from './components/NavigationControls';
import { useSurveyContext } from './contexts/SurveyContext';

const App: FC = () => {
  return (
    <SurveyProvider>
      <RootContent />
    </SurveyProvider>
  );
}

const RootContent: FC = () => {
  const { hasStarted, startSurvey, state } = useSurveyContext();
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col" style={{ height: '100vh' }}>
      <SurveyHeader />
      <div className="flex-1 overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
        {!hasStarted ? (
          <div className="w-full h-full flex items-center justify-center">
            <button
              onClick={startSurvey}
              disabled={state.isLoading || !!state.error || !state.surveyData}
              className="px-6 py-3 rounded-lg bg-climate-teal-600 hover:bg-climate-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-semibold shadow"
            >
              Start the survey
            </button>
          </div>
        ) : (
          <FlowDiagram />
        )}
      </div>
      {hasStarted && <NavigationControls />}
    </div>
  );
}

export default App;
