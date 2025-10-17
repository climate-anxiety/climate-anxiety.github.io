export interface Survey {
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'scale' | 'binary' | 'single_select' | 'multi_select';
  question: string;
  scale?: ScaleConfig;
  options?: Option[];
  parent?: string | string[];
  parentAnswer?: string | string[];
  branches?: Record<string, string[]>;
  allowCustom?: boolean;
  customLimit?: number;
}

export interface ScaleConfig {
  min: number;
  max: number;
  labels: string[];
}

export interface Option {
  value: string;
  label: string;
}

export interface QuestionResponse {
  questionId: string;
  questionText: string;
  questionType: 'scale' | 'binary' | 'single_select' | 'multi_select';
  selectedAnswers: string[];
  customAnswers?: string[];
  timestamp: string;
  nextQuestions: string[];
}

export interface UserPath {
  pathId: string;
  responses: Record<string, QuestionResponse>;
  isActive: boolean;
  currentQuestionId?: string | null;
  createdAt: string;
}

export interface LocalSurveyData {
  sessionId: string;
  surveyId: string;
  startedAt: string;
  lastUpdated: string;
  currentPaths: UserPath[];
  completedPaths: UserPath[];
  isCompleted: boolean;
  version: string;
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    questionId: string;
    questionText: string;
    questionType: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
    selectedAnswer?: string;
    pathId?: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: {
    answer?: string;
  };
}
