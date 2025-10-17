import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { type Survey, type Question, type UserPath, type QuestionResponse, type FlowNode, type FlowEdge, type LocalSurveyData } from '../types/survey';
import { LocalStorageManager } from '../utils/localStorage';
import surveyData from '../assets/climate_anxiety_survey.json';

interface SurveyState {
  surveyData: Survey | null;
  currentPaths: UserPath[];
  flowData: { nodes: FlowNode[]; edges: FlowEdge[] };
  currentQuestionId: string | null;
  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;
}

type SurveyAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_SURVEY'; payload: Survey }
  | { type: 'SET_CURRENT_QUESTION'; payload: string | null }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answers: string[]; customAnswers?: string[]; pathId: string } }
  | { type: 'NAVIGATE_TO_QUESTION'; payload: { questionId: string; pathId: string } }
  | { type: 'CLEAR_SURVEY' }
  | { type: 'SET_PATHS'; payload: UserPath[] }
  | { type: 'SET_FLOW_DATA'; payload: { nodes: FlowNode[]; edges: FlowEdge[] } }
  | { type: 'SET_COMPLETED'; payload: boolean };

const initialState: SurveyState = {
  surveyData: null,
  currentPaths: [],
  flowData: { nodes: [], edges: [] },
  currentQuestionId: null,
  isLoading: true,
  error: null,
  isCompleted: false,
};

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOAD_SURVEY':
      return { ...state, surveyData: action.payload, isLoading: false };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestionId: action.payload };
    case 'ANSWER_QUESTION':
      return handleAnswerQuestion(state, action.payload);
    case 'NAVIGATE_TO_QUESTION':
      return handleNavigateToQuestion(state, action.payload);
    case 'CLEAR_SURVEY':
      return { 
        ...state, 
        currentPaths: [], 
        currentQuestionId: null, 
        isCompleted: false,
        flowData: { nodes: [], edges: [] }
      };
    case 'SET_PATHS':
      return { ...state, currentPaths: action.payload };
    case 'SET_FLOW_DATA':
      return { ...state, flowData: action.payload };
    case 'SET_COMPLETED':
      return { ...state, isCompleted: action.payload };
    default:
      return state;
  }
}

function handleAnswerQuestion(state: SurveyState, payload: { questionId: string; answers: string[]; customAnswers?: string[]; pathId: string }): SurveyState {
  const { questionId, answers, customAnswers, pathId } = payload;
  const question = state.surveyData?.questions.find(q => q.id === questionId);
  if (!question) return state;

  const updatedPaths = state.currentPaths.map(path => {
    if (path.pathId === pathId) {
      const response: QuestionResponse = {
        questionId,
        questionText: question.question,
        questionType: question.type,
        selectedAnswers: answers,
        customAnswers,
        timestamp: new Date().toISOString(),
        nextQuestions: getNextQuestions(question, answers)
      };

      const updatedResponses = { ...path.responses, [questionId]: response };
      const nextQuestionId = getNextQuestionId(question, answers);

      return {
        ...path,
        responses: updatedResponses,
        currentQuestionId: nextQuestionId
      };
    }
    return path;
  });

  // Save to localStorage
  const surveyData: LocalSurveyData = {
    sessionId: LocalStorageManager.getSessionId(),
    surveyId: 'climate_anxiety_survey',
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    currentPaths: updatedPaths,
    completedPaths: state.currentPaths.filter(p => !p.isActive),
    isCompleted: updatedPaths.every(p => !p.currentQuestionId),
    version: '1.0.0'
  };

  LocalStorageManager.saveSurveyData(surveyData);

  return {
    ...state,
    currentPaths: updatedPaths,
    currentQuestionId: updatedPaths.find(p => p.isActive)?.currentQuestionId || null,
    isCompleted: updatedPaths.every(p => !p.currentQuestionId)
  };
}

function handleNavigateToQuestion(state: SurveyState, payload: { questionId: string; pathId: string }): SurveyState {
  const { questionId, pathId } = payload;
  const updatedPaths = state.currentPaths.map(path => {
    if (path.pathId === pathId) {
      return { ...path, currentQuestionId: questionId };
    }
    return path;
  });

  return {
    ...state,
    currentPaths: updatedPaths,
    currentQuestionId: questionId
  };
}

function getNextQuestions(question: Question, answers: string[]): string[] {
  if (!question.branches) return [];
  
  const nextQuestions: string[] = [];
  answers.forEach(answer => {
    if (question.branches![answer]) {
      nextQuestions.push(...question.branches![answer]);
    }
  });
  
  return [...new Set(nextQuestions)];
}

function getNextQuestionId(question: Question, answers: string[]): string | null {
  const nextQuestions = getNextQuestions(question, answers);
  if (nextQuestions.length === 0) return null;
  
  // For multi-select, create new paths for additional answers
  if (question.type === 'multi_select' && answers.length > 1) {
    return nextQuestions[0]; // Return first question for current path
  }
  
  return nextQuestions[0];
}

interface SurveyContextType {
  state: SurveyState;
  answerQuestion: (questionId: string, answers: string[], customAnswers?: string[]) => void;
  navigateToQuestion: (questionId: string, pathId: string) => void;
  clearSurvey: () => void;
  loadSurvey: () => void;
  canGoBack: boolean;
  goBack: () => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveyContext must be used within a SurveyProvider');
  }
  return context;
};

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  const loadSurvey = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Load from JSON file
      const survey = surveyData.survey as Survey;
      dispatch({ type: 'LOAD_SURVEY', payload: survey });

      // Try to load existing session
      const existingData = LocalStorageManager.loadSurveyData();
      if (existingData && !existingData.isCompleted) {
        dispatch({ type: 'SET_PATHS', payload: existingData.currentPaths });
        const activePath = existingData.currentPaths.find(p => p.isActive);
        if (activePath?.currentQuestionId) {
          dispatch({ type: 'SET_CURRENT_QUESTION', payload: activePath.currentQuestionId });
        }
        dispatch({ type: 'SET_COMPLETED', payload: existingData.isCompleted });
      } else {
        // Start new survey
        const firstQuestionId = survey.questions[0]?.id;
        if (firstQuestionId) {
          const initialPath: UserPath = {
            pathId: 'path_1',
            responses: {},
            isActive: true,
            currentQuestionId: firstQuestionId,
            createdAt: new Date().toISOString()
          };
          dispatch({ type: 'SET_PATHS', payload: [initialPath] });
          dispatch({ type: 'SET_CURRENT_QUESTION', payload: firstQuestionId });
        }
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load survey' });
    }
  };

  const answerQuestion = (questionId: string, answers: string[], customAnswers?: string[]) => {
    const activePath = state.currentPaths.find(p => p.isActive);
    if (!activePath) return;

    dispatch({ 
      type: 'ANSWER_QUESTION', 
      payload: { questionId, answers, customAnswers, pathId: activePath.pathId } 
    });
  };

  const navigateToQuestion = (questionId: string, pathId: string) => {
    dispatch({ type: 'NAVIGATE_TO_QUESTION', payload: { questionId, pathId } });
  };

  const clearSurvey = () => {
    LocalStorageManager.clearSurveyData();
    dispatch({ type: 'CLEAR_SURVEY' });
    
    // Reset to first question
    if (state.surveyData && state.surveyData.questions.length > 0) {
      const initialPath: UserPath = {
        pathId: 'path_1',
        responses: {},
        isActive: true,
        currentQuestionId: state.surveyData.questions[0].id,
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'SET_PATHS', payload: [initialPath] });
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.surveyData.questions[0].id });
      dispatch({ type: 'SET_COMPLETED', payload: false });
    }
  };

  const canGoBack = state.currentPaths.some(path => 
    path.isActive && Object.keys(path.responses).length > 0
  );

  const goBack = () => {
    const activePath = state.currentPaths.find(p => p.isActive);
    if (!activePath) return;

    const responseKeys = Object.keys(activePath.responses);
    if (responseKeys.length === 0) return;

    const lastQuestionId = responseKeys[responseKeys.length - 1];
    const updatedResponses = { ...activePath.responses };
    delete updatedResponses[lastQuestionId];

    const updatedPath = {
      ...activePath,
      responses: updatedResponses,
      currentQuestionId: lastQuestionId
    };

    dispatch({ type: 'SET_PATHS', payload: [updatedPath] });
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: lastQuestionId });
  };

  useEffect(() => {
    loadSurvey();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Survey state updated:', {
      surveyData: !!state.surveyData,
      currentQuestionId: state.currentQuestionId,
      currentPaths: state.currentPaths.length,
      isCompleted: state.isCompleted,
      isLoading: state.isLoading,
      error: state.error
    });
    
    if (state.surveyData && state.surveyData.questions.length > 0) {
      console.log('First question:', state.surveyData.questions[0]);
    }
  }, [state]);

  const contextValue: SurveyContextType = {
    state,
    answerQuestion,
    navigateToQuestion,
    clearSurvey,
    loadSurvey,
    canGoBack,
    goBack
  };

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
};
