import { type FC } from 'react';
import { SurveyProvider } from './contexts/SurveyContext';
import { SurveyHeader } from './components/SurveyHeader';
import { FlowDiagram } from './components/FlowDiagram';
import { NavigationControls } from './components/NavigationControls';

const App: FC = () => {
  return (
    <SurveyProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col" style={{ height: '100vh' }}>
        <SurveyHeader />
        <div className="flex-1 overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
          <FlowDiagram />
        </div>
        <NavigationControls />
      </div>
    </SurveyProvider>
  );
}

export default App;
