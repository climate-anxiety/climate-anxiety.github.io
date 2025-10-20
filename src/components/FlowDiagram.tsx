import React from 'react';
import { ReactFlow, Background, Controls, type Node, type Edge, MarkerType, PanOnScrollMode, type ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import QNode from './QNode';
import ChoiceNode from './ChoiceNode';
import type { TreeData, FlowState, QNodeState } from '../types/treeFlow';
import { sampleTreeData } from '../data/sampleTreeData';
import { useSurveyContext } from '../contexts/SurveyContext';

const customNodeTypes = {
  qNode: QNode,
  choiceNode: ChoiceNode,
};

export const FlowDiagram: React.FC = () => {
  const rfInstanceRef = React.useRef<ReactFlowInstance | null>(null);
  const didFitOnceRef = React.useRef(false);
  const initialViewportRef = React.useRef<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 0.9 });
  const treeData: TreeData = sampleTreeData;
  const { state: surveyState } = useSurveyContext();
  const { answerQuestion, navigateToQuestion } = useSurveyContext();

  const [flowState, setFlowState] = React.useState<FlowState>(() => {
    const startId = treeData.startQuestionId;
    const initialNode: QNodeState = {
      questionId: startId,
      isHighlighted: false,
      selectedChoiceIds: [],
      isExpanded: false,
      position: { x: 100, y: 100 },
      childrenVisible: true,
    };
    return {
      nodes: { [startId]: initialNode },
      edges: [],
      createdNodes: new Set<string>([startId]),
    };
  });

  // Text measurement for dynamic sizing (declared early for downstream helpers)
  const measureCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const getMeasureCtx = React.useCallback(() => {
    if (measureCtxRef.current) return measureCtxRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Tailwind text-xs ~ 12px, medium weight
      ctx.font = '500 12px Inter, ui-sans-serif, system-ui, -apple-system';
      measureCtxRef.current = ctx;
      return ctx;
    }
    return null;
  }, []);

  const estimateChoiceWidth = React.useCallback((label: string) => {
    const ctx = getMeasureCtx();
    const textWidth = ctx ? ctx.measureText(label).width : Math.max(40, label.length * 7);
    const horizontalPadding = 12 * 2; // px-3 both sides
    const borders = 2 * 2; // border-2 both sides
    return Math.ceil(textWidth + horizontalPadding + borders);
  }, [getMeasureCtx]);

  // Helpers to mirror node sizing used in convertToReactFlowNodes
  const getQuestionContainerMetrics = React.useCallback((questionId: string) => {
    const questionConfig = treeData.questions[questionId];
    const choiceWidths = questionConfig.choices.map(c => estimateChoiceWidth(c.label));
    const spacing = 8; // vertical spacing between choices
    const maxChoiceWidth = Math.max(120, ...choiceWidths);
    const containerPadding = 16 * 2; // px-4 left/right
    const minContainer = 300; // ensure reasonable width for question text area
    const maxContainer = 800; // cap to avoid overly wide nodes
    // Reserve space for left question text plus right choices column
    const containerWidth = Math.max(minContainer, Math.min(maxContainer, maxChoiceWidth + containerPadding + 80));
    const headerHeight = 48; // question title area
    const choiceHeight = 36; // approx height of a choice pill
    const choicesBlockHeight = questionConfig.choices.length > 0
      ? questionConfig.choices.length * choiceHeight + (questionConfig.choices.length - 1) * spacing
      : 0;
    const containerHeight = headerHeight + choicesBlockHeight;
    return { choiceWidths, spacing, maxChoiceWidth, containerWidth, containerHeight, headerHeight, choiceHeight };
  }, [treeData.questions, estimateChoiceWidth]);

  const calculateChildPosition = React.useCallback((parentQuestionId: string, choiceId: string, targetQuestionId: string) => {
    const parentNode = flowState.nodes[parentQuestionId];
    const parentChoices = treeData.questions[parentQuestionId].choices;

    // Horizontal flow: place child to the right of parent with a gap
    const { containerHeight: parentHeight, containerWidth } = getQuestionContainerMetrics(parentQuestionId);
    const horizontalGap = 200;
    const childX = parentNode.position.x + containerWidth + horizontalGap;

    // Precompute vertical layout as if all child Q-Nodes existed
    const childHeights = parentChoices.map(c => getQuestionContainerMetrics(c.targetQuestionId).containerHeight);
    const childSpacing = 40; // vertical spacing between child Q-Nodes
    const totalChildrenHeight = childHeights.reduce((a, b) => a + b, 0) + Math.max(0, (childHeights.length - 1) * childSpacing);
    const topY = parentNode.position.y + Math.max(0, (parentHeight - totalChildrenHeight) / 2);

    // Compute top for the specific choice by summing previous child heights + spacing
    const choiceIndex = parentChoices.findIndex(c => c.id === choiceId);
    const offsetY = childHeights.slice(0, choiceIndex).reduce((sum, h) => sum + h, 0) + Math.max(0, choiceIndex * childSpacing);

    const targetMetrics = getQuestionContainerMetrics(targetQuestionId);
    const childY = topY + offsetY; // position by top-left of child container

    // Offset upward by half the parent Q-Node height
    return { x: childX, y: childY - parentHeight / 2 };
  }, [flowState.nodes, treeData.questions, getQuestionContainerMetrics]);

  const calculateChoicePosition = React.useCallback((parentQuestionId: string, choiceId: string) => {
    const parentChoices = treeData.questions[parentQuestionId].choices;
    const choiceIndex = parentChoices.findIndex(c => c.id === choiceId);
    const { choiceWidths, maxChoiceWidth, headerHeight, choiceHeight, spacing, containerWidth } = getQuestionContainerMetrics(parentQuestionId);
    const rightPadding = 16;
    const columnLeftX = Math.max(0, containerWidth - rightPadding - maxChoiceWidth);
    const width = choiceWidths[choiceIndex] ?? Math.min(maxChoiceWidth, 140);
    const overlapOffset = 24; // allow pill to cross the right border slightly
    const x = columnLeftX + (maxChoiceWidth - width) + overlapOffset; // shift right for slight overlap
    const y = headerHeight + choiceIndex * (choiceHeight + spacing);
    return { x, y };
  }, [treeData.questions, getQuestionContainerMetrics]);

  const getChoiceNodeId = React.useCallback((questionId: string, choiceId: string) => `choice-${questionId}-${choiceId}`,[ ]);

  // Text measurement for dynamic sizing
  // (moved above for dependency ordering)

  const updateSubtreeVisibility = React.useCallback((questionId: string, visible: boolean, state: FlowState) => {
    if (!state.createdNodes.has(questionId)) return;
    const nodeState = state.nodes[questionId];
    state.nodes[questionId] = { ...nodeState, childrenVisible: visible };
    if (!visible || nodeState.isExpanded) {
      nodeState.selectedChoiceIds.forEach(choiceId => {
        const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
        if (!choice) return;
        const edgeIndex = state.edges.findIndex(e => e.sourceQuestionId === questionId && e.sourceChoiceId === choiceId);
        if (edgeIndex >= 0) {
          state.edges[edgeIndex] = { ...state.edges[edgeIndex], isVisible: visible && nodeState.isExpanded };
        }
        updateSubtreeVisibility(choice.targetQuestionId, visible && nodeState.isExpanded, state);
      });
    }
  }, [treeData.questions]);

  const toggleBranchVisibility = React.useCallback((questionId: string) => {
    setFlowState(prev => {
      const nodeState = prev.nodes[questionId];
      const newExpanded = !nodeState.isExpanded;
      const newState: FlowState = {
        ...prev,
        nodes: {
          ...prev.nodes,
          [questionId]: { ...nodeState, isExpanded: newExpanded },
        },
        edges: prev.edges.map(edge => (
          edge.sourceQuestionId === questionId && nodeState.selectedChoiceIds.includes(edge.sourceChoiceId)
            ? { ...edge, isVisible: newExpanded }
            : edge
        )),
      };
      nodeState.selectedChoiceIds.forEach(choiceId => {
        const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
        if (choice) updateSubtreeVisibility(choice.targetQuestionId, newExpanded, newState);
      });
      return newState;
    });
  }, [treeData.questions, updateSubtreeVisibility]);

  const deselectChoice = React.useCallback((questionId: string, choiceId: string) => {
    setFlowState(prev => {
      const newState: FlowState = { ...prev, nodes: { ...prev.nodes }, edges: prev.edges.map(e => ({ ...e })) };
      newState.nodes[questionId] = {
        ...prev.nodes[questionId],
        selectedChoiceIds: prev.nodes[questionId].selectedChoiceIds.filter(id => id !== choiceId),
      };
      newState.edges = newState.edges.map(edge =>
        edge.sourceQuestionId === questionId && edge.sourceChoiceId === choiceId ? { ...edge, isVisible: false } : edge
      );
      const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
      if (choice) {
        const targetStillReferenced = newState.edges.some(edge => edge.target === choice.targetQuestionId && edge.isVisible && edge.sourceQuestionId !== questionId);
        if (!targetStillReferenced) {
          updateSubtreeVisibility(choice.targetQuestionId, false, newState);
        }
      }
      return newState;
    });
  }, [treeData.questions, updateSubtreeVisibility]);

  const selectChoice = React.useCallback((questionId: string, choiceId: string, targetQuestionId: string) => {
    setFlowState(prev => {
      const newState: FlowState = { ...prev, nodes: { ...prev.nodes }, edges: prev.edges.map(e => ({ ...e })), createdNodes: new Set(prev.createdNodes) };
      newState.nodes[questionId] = {
        ...prev.nodes[questionId],
        selectedChoiceIds: [...prev.nodes[questionId].selectedChoiceIds, choiceId],
        isExpanded: true,
      };
      if (!newState.createdNodes.has(targetQuestionId)) {
        const targetPosition = calculateChildPosition(questionId, choiceId, targetQuestionId);
        newState.nodes[targetQuestionId] = {
          questionId: targetQuestionId,
          isHighlighted: false,
          selectedChoiceIds: [],
          isExpanded: false,
          position: targetPosition,
          childrenVisible: true,
        };
        newState.createdNodes.add(targetQuestionId);
      }
      const edgeId = `${questionId}-${choiceId}-${targetQuestionId}`;
      const existingEdge = newState.edges.find(e => e.id === edgeId);
      if (!existingEdge) {
        newState.edges.push({ id: edgeId, source: getChoiceNodeId(questionId, choiceId), sourceChoiceId: choiceId, sourceQuestionId: questionId, target: targetQuestionId, isVisible: true });
      } else {
        const i = newState.edges.findIndex(e => e.id === edgeId);
        newState.edges[i] = { ...newState.edges[i], isVisible: true };
      }
      return newState;
    });
  }, [calculateChildPosition, getChoiceNodeId]);

  const handleChoiceClick = React.useCallback((choiceId: string, questionId: string) => {
    const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
    if (!choice) return;

    setFlowState(prev => {
      const currentNode = prev.nodes[questionId];
      if (!currentNode) return prev;

      const nextState: FlowState = {
        ...prev,
        nodes: { ...prev.nodes, [questionId]: { ...currentNode, isHighlighted: true, isExpanded: true } },
        edges: prev.edges.map(e => ({ ...e })),
        createdNodes: new Set(prev.createdNodes),
      };

      // If no choices are selected yet for this Q-Node, instantiate the corresponding child Q-Node
      if (currentNode.selectedChoiceIds.length === 0) {
        const targetQuestionId = choice.targetQuestionId;
        if (!nextState.createdNodes.has(targetQuestionId)) {
          const targetPosition = calculateChildPosition(questionId, choiceId, targetQuestionId);
          nextState.nodes[targetQuestionId] = {
            questionId: targetQuestionId,
            isHighlighted: false,
            selectedChoiceIds: [],
            isExpanded: false,
            position: targetPosition,
            childrenVisible: true,
          };
          nextState.createdNodes.add(targetQuestionId);
        }

        // Ensure an edge exists and is visible between the clicked choice and the target Q-Node
        const edgeId = `${questionId}-${choiceId}-${targetQuestionId}`;
        const existingEdgeIndex = nextState.edges.findIndex(e => e.id === edgeId);
        const sourceId = getChoiceNodeId(questionId, choiceId);
        if (existingEdgeIndex === -1) {
          nextState.edges.push({
            id: edgeId,
            source: sourceId,
            sourceChoiceId: choiceId,
            sourceQuestionId: questionId,
            target: targetQuestionId,
            isVisible: true,
          });
        } else {
          nextState.edges[existingEdgeIndex] = { ...nextState.edges[existingEdgeIndex], isVisible: true };
        }
      }

      return nextState;
    });
  }, [treeData.questions, calculateChildPosition, getChoiceNodeId]);

  const handleQuestionClick = React.useCallback((questionId: string) => {
    const nodeState = flowState.nodes[questionId];
    if (nodeState.selectedChoiceIds.length === 0) {
      setFlowState(prev => ({
        ...prev,
        nodes: { ...prev.nodes, [questionId]: { ...prev.nodes[questionId], isHighlighted: !prev.nodes[questionId].isHighlighted } },
      }));
    } else {
      toggleBranchVisibility(questionId);
    }
  }, [flowState.nodes, toggleBranchVisibility]);

  const convertToReactFlowNodes = React.useCallback((state: FlowState): Node[] => {
    const nodes: Node[] = [];
    Array.from(state.createdNodes)
      .filter(qid => state.nodes[qid].childrenVisible)
      .forEach(qid => {
        const nodeState = state.nodes[qid];
        const questionConfig = treeData.questions[qid];

        // Dynamic sizing for vertical choices layout
        const { choiceWidths, spacing, maxChoiceWidth, containerWidth, containerHeight, headerHeight, choiceHeight } = getQuestionContainerMetrics(qid);

        nodes.push({
          id: qid,
          type: 'qNode',
          position: nodeState.position,
          data: {
            questionId: qid,
            questionText: questionConfig.label,
            isSelected: nodeState.isHighlighted,
            onQuestionClick: () => handleQuestionClick(qid),
          },
          draggable: true,
          style: { width: containerWidth, height: containerHeight },
        } as Node);

        // Add choice nodes laid out vertically centered within a right-side column
        const rightPadding = 16;
        const columnLeftX = Math.max(0, containerWidth - rightPadding - maxChoiceWidth);
        const totalChoices = questionConfig.choices.length;
        const totalChoicesHeight = totalChoices > 0 ? totalChoices * choiceHeight + (totalChoices - 1) * spacing : 0;
        let cursorY = Math.max(0, (containerHeight - totalChoicesHeight) / 2);
        questionConfig.choices.forEach((choice, idx) => {
          const width = choiceWidths[idx];
          const overlapOffset = 24; // allow pill to cross the right border slightly
          const choicePos = { x: columnLeftX + (maxChoiceWidth - width) + overlapOffset, y: cursorY };
          nodes.push({
            id: getChoiceNodeId(qid, choice.id),
            type: 'choiceNode',
            position: choicePos,
            data: {
              questionId: qid,
              choiceId: choice.id,
              choiceLabel: choice.label,
              isSelected: state.nodes[qid].selectedChoiceIds.includes(choice.id),
              onChoiceClick: handleChoiceClick,
            },
            draggable: false,
            parentNode: qid,
            style: { width },
          } as Node);
          cursorY += choiceHeight + spacing;
        });
      });
    return nodes;
  }, [treeData.questions, handleQuestionClick, handleChoiceClick, estimateChoiceWidth]);

  const convertToReactFlowEdges = React.useCallback((state: FlowState): Edge[] => {
    // First, collect only edges that are currently visible and whose source/target parents are visible
    const visibleEdges = state.edges
      .filter(e => e.isVisible)
      .filter(
        e => (e.sourceQuestionId ? state.nodes[e.sourceQuestionId]?.childrenVisible : true) && state.nodes[e.target]?.childrenVisible
      );

    // Count how many visible outgoing edges exist per Q-node
    const outgoingCountByQuestionId: Record<string, number> = {};
    visibleEdges.forEach(e => {
      const qid = e.sourceQuestionId;
      if (!qid) return;
      outgoingCountByQuestionId[qid] = (outgoingCountByQuestionId[qid] ?? 0) + 1;
    });

    // Build React Flow edges with curved bezier style for all
    return visibleEdges.map(e => {
      const outgoingCount = e.sourceQuestionId ? outgoingCountByQuestionId[e.sourceQuestionId] ?? 0 : 0;
      const type = 'bezier';
      return {
        id: e.id,
        source: e.source,
        sourceHandle: 'source',
        target: e.target,
        type,
        style: { stroke: '#3B82F6', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
      };
    });
  }, []);

  const nodes = React.useMemo(() => convertToReactFlowNodes(flowState), [flowState, convertToReactFlowNodes]);
  const edges = React.useMemo(() => convertToReactFlowEdges(flowState), [flowState, convertToReactFlowEdges]);

  React.useEffect(() => {
    // ensure start node has a sensible initial position if untouched
    setFlowState(prev => {
      const startId = treeData.startQuestionId;
      const node = prev.nodes[startId];
      if (!node) return prev;
      if (node.position.x !== 0 || node.position.y !== 0) return prev;
      return { ...prev, nodes: { ...prev.nodes, [startId]: { ...node, position: { x: 100, y: 100 } } } };
    });
  }, [treeData.startQuestionId]);

  // Recompute the entire diagram from survey answers whenever they change
  React.useEffect(() => {
    const activePath = surveyState.currentPaths.find(p => p.isActive);
    if (!activePath) return;

    // Build a fresh state purely from answered choices
    const freshState: FlowState = {
      nodes: {},
      edges: [],
      createdNodes: new Set<string>(),
    };

    const startId = treeData.startQuestionId;
    const ensureNode = (questionId: string) => {
      if (!freshState.createdNodes.has(questionId)) {
        freshState.nodes[questionId] = {
          questionId,
          isHighlighted: false,
          selectedChoiceIds: [],
          isExpanded: false,
          position: freshState.createdNodes.size === 0 ? { x: 100, y: 100 } : { x: 0, y: 0 },
          childrenVisible: true,
        };
        freshState.createdNodes.add(questionId);
      }
    };

    // Local helpers avoid capturing outer state and breaking dependency stability
    const localGetChoiceNodeId = (questionId: string, choiceId: string) => `choice-${questionId}-${choiceId}`;
    const localCalculateChildPosition = (parentQuestionId: string, choiceId: string, targetQuestionId: string) => {
      const parentNode = freshState.nodes[parentQuestionId];
      const parentChoices = treeData.questions[parentQuestionId].choices;

      const { containerHeight: parentHeight, containerWidth } = getQuestionContainerMetrics(parentQuestionId);
      const horizontalGap = 200;
      const childX = parentNode.position.x + containerWidth + horizontalGap;

      // Precompute vertical layout for all prospective children
      const childHeights = parentChoices.map(c => getQuestionContainerMetrics(c.targetQuestionId).containerHeight);
      const childSpacing = 40;
      const totalChildrenHeight = childHeights.reduce((a, b) => a + b, 0) + Math.max(0, (childHeights.length - 1) * childSpacing);
      const topY = parentNode.position.y + Math.max(0, (parentHeight - totalChildrenHeight) / 2);

      const choiceIndex = parentChoices.findIndex(c => c.id === choiceId);
      const offsetY = childHeights.slice(0, choiceIndex).reduce((sum, h) => sum + h, 0) + Math.max(0, choiceIndex * childSpacing);

    const childY = topY + offsetY;
    // Offset upward by half the parent Q-Node height
    return { x: childX, y: childY - parentHeight / 2 };
    };

    ensureNode(startId);

    // Order responses by timestamp to reflect answer sequence
    const responses = Object.values(activePath.responses).sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    responses.forEach(response => {
      const questionId = response.questionId;
      const questionConfig = treeData.questions[questionId];
      if (!questionConfig) return;

      ensureNode(questionId);

      // Map each selected answer to a choice in treeData by id match, fallback to label match
      response.selectedAnswers.forEach(answerValue => {
        const choice =
          questionConfig.choices.find(c => c.id === answerValue) ||
          questionConfig.choices.find(c => c.label === answerValue);
        if (!choice) return;

        const targetQuestionId = choice.targetQuestionId;
        ensureNode(targetQuestionId);

        // mark selection and expand
        const nodeState = freshState.nodes[questionId];
        if (!nodeState.selectedChoiceIds.includes(choice.id)) {
          nodeState.selectedChoiceIds.push(choice.id);
          nodeState.isExpanded = true;
        }

        // compute child position from precomputed vertical stack
        const pos = localCalculateChildPosition(questionId, choice.id, targetQuestionId);
        freshState.nodes[targetQuestionId] = {
          ...freshState.nodes[targetQuestionId],
          position: pos,
        };

        const edgeId = `${questionId}-${choice.id}-${targetQuestionId}`;
        if (!freshState.edges.find(e => e.id === edgeId)) {
          freshState.edges.push({
            id: edgeId,
            source: localGetChoiceNodeId(questionId, choice.id),
            sourceChoiceId: choice.id,
            sourceQuestionId: questionId,
            target: targetQuestionId,
            isVisible: true,
          });
        }
      });
    });

    setFlowState(freshState);
  }, [surveyState.currentPaths, treeData.questions, treeData.startQuestionId, getQuestionContainerMetrics]);

  const resetViewport = React.useCallback(() => {
    const instance = rfInstanceRef.current;
    if (!instance) return;
    try {
      instance.setViewport(initialViewportRef.current);
    } catch {}
  }, []);

  return (
    <div className="h-full bg-gray-950 border-b border-gray-800 relative" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
      <button
        type="button"
        onClick={resetViewport}
        className="absolute z-10 top-3 right-3 px-3 py-1.5 text-sm rounded-md bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700 shadow"
      >
        Reset view
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodeTypes}
        onlyRenderVisibleElements
        attributionPosition="bottom-left"
        className="bg-gray-950"
        style={{ width: '100%', height: '100%' }}
        defaultEdgeOptions={{ type: 'bezier', style: { stroke: '#3B82F6', strokeWidth: 2 } }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={initialViewportRef.current}
        onInit={(instance) => {
          rfInstanceRef.current = instance;
          if (!didFitOnceRef.current) {
            didFitOnceRef.current = true;
            // fit once after mount
            setTimeout(() => {
              try {
                instance.fitView({ padding: 0.2, includeHiddenNodes: true });
              } catch {}
            }, 0);
          }
        }}
        onNodeDragStop={(_, node) => {
          setFlowState(prev => {
            if (!(node.id in prev.nodes)) return prev;
            const prevNodeState = prev.nodes[node.id as string];
            return {
              ...prev,
              nodes: {
                ...prev.nodes,
                [node.id]: { ...prevNodeState, position: node.position },
              },
            };
          });
        }}
        panOnDrag
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Free}
        zoomOnScroll={false}
        selectionOnDrag={false}
        translateExtent={[[-100000, -100000], [100000, 100000]]}
      >
        <Background color="#1f2937" />
        <Controls />
      </ReactFlow>
    </div>
  );
};
