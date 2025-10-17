import React, { useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, Handle, Position, type Node, type Edge, type NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSurveyContext } from '../contexts/SurveyContext';
import CurrentQuestionNode from './CurrentQuestionNode';
import ChoiceNode from './ChoiceNode';
import CompletedQuestionNode from './CompletedQuestionNode';

const QuestionNode: React.FC<NodeProps> = ({ data }) => {
  const isCurrentQuestion = data.isCurrent;
  const isCompleted = data.isCompleted;
  const questionType = data.questionType;
  
  return (
    <div className={`px-4 py-3 rounded-lg border-2 cursor-pointer transition-all min-w-[240px] max-w-[280px] ${
      isCurrentQuestion 
        ? 'border-climate-teal-500 bg-gray-900 shadow-lg ring-2 ring-climate-teal-200' 
        : isCompleted
        ? 'border-green-400 bg-gray-900 shadow-md'
        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
    }`}>
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-100">
          {data.questionId}
        </div>
        {isCurrentQuestion && (
          <div className="w-2 h-2 bg-climate-teal-500 rounded-full animate-pulse"></div>
        )}
        {isCompleted && (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
      </div>
      
      {isCurrentQuestion && (
        <div className="text-xs text-gray-200 mb-2 line-clamp-3">
          {data.questionText}
        </div>
      )}
      
      <div className="text-xs text-gray-300 capitalize mb-2">
        {questionType.replace('_', ' ')}
      </div>
      
      {data.selectedAnswer && (
        <div className="text-xs text-climate-teal-300 truncate bg-gray-800 px-2 py-1 rounded">
          ✓ {data.selectedAnswer}
        </div>
      )}
    </div>
  );
};

const customNodeTypes = {
  question: QuestionNode,
  currentQuestion: CurrentQuestionNode,
  choice: ChoiceNode,
  completedQuestion: CompletedQuestionNode,
};

export const FlowDiagram: React.FC = () => {
  const { state, navigateToQuestion, answerQuestion } = useSurveyContext();

  const generateFlowData = useCallback(() => {
    console.log('Generating flow data:', {
      hasSurveyData: !!state.surveyData,
      currentQuestionId: state.currentQuestionId,
      questionsCount: state.surveyData?.questions.length || 0
    });

    if (!state.surveyData) return { nodes: [], edges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const activePath = state.currentPaths.find(p => p.isActive);
    
    // Get the current question or default to first question
    let currentQuestion = state.surveyData.questions.find(q => q.id === state.currentQuestionId);
    if (!currentQuestion && state.surveyData.questions.length > 0) {
      currentQuestion = state.surveyData.questions[0];
      console.log('Using first question as fallback:', currentQuestion.id);
    }
    if (!currentQuestion) {
      console.log('No current question found');
      return { nodes, edges };
    }

    console.log('Current question:', currentQuestion.id, currentQuestion.type);
    
    // Add completed questions to the left with their next questions
    if (activePath) {
      const completedQuestions = Object.keys(activePath.responses);
      completedQuestions.forEach((questionId, index) => {
        const question = state.surveyData?.questions.find(q => q.id === questionId);
        if (question) {
          const x = 100;
          const y = 100 + (index * 200);
          
          // Add completed question node
          nodes.push({
            id: questionId,
            type: 'completedQuestion',
            position: { x, y },
            data: {
              questionId: question.id,
              questionText: question.question,
              questionType: question.type,
              isCurrent: false,
              isCompleted: true,
              selectedAnswer: activePath.responses[questionId]?.selectedAnswers?.[0] || '',
              pathId: activePath?.pathId,
              question: question
            }
          });
          
          // Add the next question that was reached from this completed question
          const response = activePath.responses[questionId];
          if (response && response.nextQuestions && response.nextQuestions.length > 0) {
            const nextQuestionId = response.nextQuestions[0];
            const nextQuestion = state.surveyData?.questions.find(q => q.id === nextQuestionId);
            if (nextQuestion) {
              const nextX = 400;
              const nextY = 100 + (index * 200);
              
              nodes.push({
                id: nextQuestionId,
                type: nextQuestionId === currentQuestion.id ? 'currentQuestion' : 'question',
                position: { x: nextX, y: nextY },
                data: {
                  questionId: nextQuestion.id,
                  questionText: nextQuestion.question,
                  questionType: nextQuestion.type,
                  isCurrent: nextQuestionId === currentQuestion.id,
                  isCompleted: false,
                  selectedAnswer: '',
                  pathId: activePath?.pathId,
                  question: nextQuestion
                }
              });
              
              // Connect completed question to next question
              edges.push({
                id: `${questionId}-to-${nextQuestionId}`,
                source: questionId,
                target: nextQuestionId,
                type: 'smoothstep',
                style: { 
                  stroke: '#14b8a6', 
                  strokeWidth: 3,
                  strokeDasharray: '0'
                },
                animated: true,
                data: { 
                  answer: response.selectedAnswers[0], 
                  isActive: true 
                }
              });
            }
          }
        }
      });
    }
    
    // Add the current question as the main node in the center (if not already added)
    if (!nodes.find(n => n.id === currentQuestion.id)) {
      nodes.push({
        id: currentQuestion.id,
        type: 'currentQuestion',
        position: { x: 400, y: 300 },
        data: {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          questionType: currentQuestion.type,
          isCurrent: true,
          isCompleted: false,
          selectedAnswer: '',
          pathId: activePath?.pathId,
          question: currentQuestion
        }
      });
    }

    return { nodes, edges };
  }, [state.surveyData, state.currentPaths, state.currentQuestionId]);

  const flowData = useMemo(() => generateFlowData(), [generateFlowData]);
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);

  // Update nodes when flow data changes
  React.useEffect(() => {
    console.log('Flow data updated:', { nodes: flowData.nodes.length, edges: flowData.edges.length });
    setNodes(flowData.nodes);
    setEdges(flowData.edges);
  }, [flowData, setNodes, setEdges]);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    const nodeId = node.id;
    const pathId = node.data?.pathId;
    
    // Handle question node clicks - navigate to the question
    if (nodeId && pathId) {
      navigateToQuestion(nodeId, pathId);
    }
  }, [navigateToQuestion]);

  if (!state.surveyData) {
    return (
      <div className="h-full bg-gray-950 border-b border-gray-800 flex items-center justify-center" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
        <p className="text-gray-200">Loading flow diagram...</p>
      </div>
    );
  }

  // If no current question but we have survey data, show first question
  if (!state.currentQuestionId && state.surveyData.questions.length > 0) {
    console.log('No current question, showing first question');
    const firstQuestion = state.surveyData.questions[0];
    return (
      <div className="h-full bg-gray-950 border-b border-gray-800 flex items-center justify-center" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
        <div className="text-center">
          <p className="text-gray-200 mb-4">Survey loaded but no current question set</p>
          <p className="text-sm text-gray-300">First question: {firstQuestion.id}</p>
          <p className="text-xs text-gray-400 mt-2">Question: {firstQuestion.question}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-950 border-b border-gray-800 relative" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-700">
        <div className="text-sm font-semibold text-gray-100 mb-2">Legend</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-climate-teal-500 rounded-full animate-pulse"></div>
            <span className="text-gray-200">Current question</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-200">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-gray-200">Available</span>
          </div>
        </div>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={customNodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-950"
        style={{ width: '100%', height: '100%' }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#6b7280', strokeWidth: 2 }
        }}
      >
        <Background color="#1f2937" />
        <Controls />
      </ReactFlow>
    </div>
  );
};
