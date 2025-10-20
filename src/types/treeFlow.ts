export interface TreeData {
  questions: Record<string, QuestionConfig>;
  startQuestionId: string;
}

export interface QuestionConfig {
  id: string;
  label: string;
  choices: ChoiceConfig[];
}

export interface ChoiceConfig {
  id: string;
  label: string;
  targetQuestionId: string;
}

// Runtime State
export interface QNodeState {
  questionId: string;
  isHighlighted: boolean;
  selectedChoiceIds: string[];
  isExpanded: boolean;
  position: { x: number; y: number };
  childrenVisible: boolean;
}

export interface FlowState {
  nodes: Record<string, QNodeState>;
  edges: EdgeState[];
  createdNodes: Set<string>; // Track which Q-Nodes have been instantiated
  choiceNodes?: Record<string, ChoiceNodeState>; // Choice nodes keyed by choice node id
  createdChoiceNodes?: Set<string>; // Track which Choice-Nodes have been instantiated
}

export interface EdgeState {
  id: string;
  source: string; // Source node ID (choice node id)
  sourceChoiceId: string; // Which C-Node created this edge
  sourceQuestionId?: string; // Parent Q-Node ID that owns the choice
  target: string; // Q-Node ID
  isVisible: boolean;
}

export interface ChoiceNodeState {
  id: string; // choice node id: e.g., choice-<questionId>-<choiceId>
  questionId: string; // parent question id
  choiceId: string;
  label: string;
  position: { x: number; y: number };
  isVisible: boolean;
}
