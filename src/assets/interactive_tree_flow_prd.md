# Interactive Decision Tree Flow - Feature Specification

## 1. Feature Overview

### 1.1 Objective
Build an interactive decision tree visualization using React Flow where users navigate through questions (Q-Nodes) by selecting choices (C-Nodes), with dynamic expansion/collapse functionality and intelligent node reuse.

### 1.2 Core Behavior
- **Vertical Flow**: Parent Q-Nodes at top, children below
- **Interactive Navigation**: Click C-Nodes to create child Q-Nodes
- **Branch Management**: Click Q-Nodes to toggle visibility of their child branches
- **Node Reuse**: Multiple C-Nodes can reference the same target Q-Node
- **Multi-Selection**: Multiple C-Nodes per Q-Node can be selected simultaneously

## 2. Component Architecture

### 2.1 Data Structure

```typescript
interface TreeData {
  questions: Record<string, QuestionConfig>;
  startQuestionId: string;
}

interface QuestionConfig {
  id: string;
  label: string;
  choices: ChoiceConfig[];
}

interface ChoiceConfig {
  id: string;
  label: string;
  targetQuestionId: string;
}

// Runtime State
interface QNodeState {
  questionId: string;
  isHighlighted: boolean;
  selectedChoiceIds: string[];
  isExpanded: boolean;
  position: { x: number; y: number };
  childrenVisible: boolean;
}

interface FlowState {
  nodes: Record<string, QNodeState>;
  edges: EdgeState[];
  createdNodes: Set<string>; // Track which Q-Nodes have been instantiated
}

interface EdgeState {
  id: string;
  source: string; // Q-Node ID
  sourceChoiceId: string; // Which C-Node created this edge
  target: string; // Q-Node ID
  isVisible: boolean;
}
```

### 2.2 Core Components

```typescript
// Main Flow Component
const InteractiveTreeFlow: React.FC<InteractiveTreeFlowProps> = ({
  treeData,
  onStateChange
}) => {
  const [flowState, setFlowState] = useState<FlowState>(initialState);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={convertToReactFlowNodes(flowState)}
        edges={convertToReactFlowEdges(flowState)}
        onInit={setReactFlowInstance}
        nodeTypes={customNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

// Custom Q-Node Component
const QNode: React.FC<NodeProps<QNodeData>> = ({ data, selected }) => {
  const { questionConfig, nodeState, onQNodeClick, onCNodeClick } = data;
  
  return (
    <div
      className={`bg-white border-2 rounded-lg p-4 min-w-64 ${
        nodeState.isHighlighted 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-300'
      }`}
      onClick={(e) => handleQNodeClick(e, questionConfig.id)}
    >
      {/* Question Label */}
      <div className="text-center mb-3 font-medium text-gray-900">
        {questionConfig.label}
      </div>
      
      {/* C-Nodes Row */}
      <div className="flex flex-wrap gap-2 justify-center">
        {questionConfig.choices.map((choice) => (
          <CNode
            key={choice.id}
            choice={choice}
            isSelected={nodeState.selectedChoiceIds.includes(choice.id)}
            onClick={(e) => handleCNodeClick(e, questionConfig.id, choice.id)}
          />
        ))}
      </div>
      
      {/* Expand/Collapse Indicator */}
      {nodeState.selectedChoiceIds.length > 0 && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">
            {nodeState.isExpanded ? '▼' : '▶'} 
            {nodeState.selectedChoiceIds.length} selected
          </span>
        </div>
      )}
    </div>
  );
};

// C-Node Component  
const CNode: React.FC<CNodeProps> = ({ choice, isSelected, onClick }) => {
  return (
    <button
      className={`px-3 py-1 text-sm rounded border transition-all ${
        isSelected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
      }`}
      onClick={onClick}
    >
      {choice.label}
    </button>
  );
};
```

## 3. Event Handling Strategy

### 3.1 Click Hierarchy Implementation

```typescript
const handleQNodeClick = (
  event: React.MouseEvent, 
  questionId: string
) => {
  // Only process if click didn't originate from a C-Node
  if ((event.target as Element).closest('.c-node')) {
    return; // C-Node click will handle this
  }
  
  const nodeState = flowState.nodes[questionId];
  
  if (nodeState.selectedChoiceIds.length === 0) {
    // First time clicking this Q-Node - just highlight it
    setFlowState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [questionId]: {
          ...nodeState,
          isHighlighted: !nodeState.isHighlighted
        }
      }
    }));
  } else {
    // Q-Node has selections - toggle branch visibility
    toggleBranchVisibility(questionId);
  }
};

const handleCNodeClick = (
  event: React.MouseEvent,
  questionId: string, 
  choiceId: string
) => {
  event.stopPropagation(); // Prevent Q-Node click
  
  const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
  if (!choice) return;
  
  // Toggle C-Node selection
  const nodeState = flowState.nodes[questionId];
  const isCurrentlySelected = nodeState.selectedChoiceIds.includes(choiceId);
  
  if (isCurrentlySelected) {
    // Deselect C-Node and hide its branch
    deselectChoice(questionId, choiceId);
  } else {
    // Select C-Node and create/show its branch
    selectChoice(questionId, choiceId, choice.targetQuestionId);
  }
  
  // Also trigger Q-Node highlight
  setFlowState(prev => ({
    ...prev,
    nodes: {
      ...prev.nodes,
      [questionId]: {
        ...prev.nodes[questionId],
        isHighlighted: true
      }
    }
  }));
};
```

### 3.2 Choice Selection Logic

```typescript
const selectChoice = (
  questionId: string, 
  choiceId: string, 
  targetQuestionId: string
) => {
  setFlowState(prev => {
    const newState = { ...prev };
    
    // Update source Q-Node
    newState.nodes[questionId] = {
      ...prev.nodes[questionId],
      selectedChoiceIds: [
        ...prev.nodes[questionId].selectedChoiceIds,
        choiceId
      ],
      isExpanded: true
    };
    
    // Create target Q-Node if it doesn't exist
    if (!newState.createdNodes.has(targetQuestionId)) {
      const targetPosition = calculateChildPosition(questionId, choiceId);
      newState.nodes[targetQuestionId] = {
        questionId: targetQuestionId,
        isHighlighted: false,
        selectedChoiceIds: [],
        isExpanded: false,
        position: targetPosition,
        childrenVisible: true
      };
      newState.createdNodes.add(targetQuestionId);
    }
    
    // Create edge
    const edgeId = `${questionId}-${choiceId}-${targetQuestionId}`;
    const existingEdge = newState.edges.find(e => e.id === edgeId);
    
    if (!existingEdge) {
      newState.edges.push({
        id: edgeId,
        source: questionId,
        sourceChoiceId: choiceId,
        target: targetQuestionId,
        isVisible: true
      });
    } else {
      // Make existing edge visible
      const edgeIndex = newState.edges.findIndex(e => e.id === edgeId);
      newState.edges[edgeIndex] = {
        ...newState.edges[edgeIndex],
        isVisible: true
      };
    }
    
    return newState;
  });
};

const deselectChoice = (questionId: string, choiceId: string) => {
  setFlowState(prev => {
    const newState = { ...prev };
    
    // Update source Q-Node
    newState.nodes[questionId] = {
      ...prev.nodes[questionId],
      selectedChoiceIds: prev.nodes[questionId].selectedChoiceIds
        .filter(id => id !== choiceId)
    };
    
    // Hide edges from this choice
    newState.edges = newState.edges.map(edge => 
      edge.source === questionId && edge.sourceChoiceId === choiceId
        ? { ...edge, isVisible: false }
        : edge
    );
    
    // If no other choices point to the target, hide its entire subtree
    const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
    if (choice) {
      const targetStillReferenced = newState.edges.some(edge => 
        edge.target === choice.targetQuestionId && 
        edge.isVisible && 
        edge.source !== questionId
      );
      
      if (!targetStillReferenced) {
        hideSubtree(choice.targetQuestionId, newState);
      }
    }
    
    return newState;
  });
};
```

## 4. Branch Visibility Management

### 4.1 Toggle Branch Visibility

```typescript
const toggleBranchVisibility = (questionId: string) => {
  setFlowState(prev => {
    const nodeState = prev.nodes[questionId];
    const newExpanded = !nodeState.isExpanded;
    
    const newState = {
      ...prev,
      nodes: {
        ...prev.nodes,
        [questionId]: {
          ...nodeState,
          isExpanded: newExpanded
        }
      }
    };
    
    // Update edge visibility for all edges originating from this Q-Node
    newState.edges = prev.edges.map(edge => {
      if (edge.source === questionId && 
          nodeState.selectedChoiceIds.includes(edge.sourceChoiceId)) {
        return { ...edge, isVisible: newExpanded };
      }
      return edge;
    });
    
    // Recursively hide/show child subtrees
    nodeState.selectedChoiceIds.forEach(choiceId => {
      const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
      if (choice) {
        updateSubtreeVisibility(choice.targetQuestionId, newExpanded, newState);
      }
    });
    
    return newState;
  });
};

const updateSubtreeVisibility = (
  questionId: string, 
  visible: boolean, 
  state: FlowState
) => {
  if (!state.createdNodes.has(questionId)) return;
  
  const nodeState = state.nodes[questionId];
  
  // Update node visibility
  state.nodes[questionId] = {
    ...nodeState,
    childrenVisible: visible
  };
  
  // If hiding, recursively hide all children
  // If showing, only show if the node was previously expanded
  if (!visible || nodeState.isExpanded) {
    nodeState.selectedChoiceIds.forEach(choiceId => {
      const choice = treeData.questions[questionId].choices.find(c => c.id === choiceId);
      if (choice) {
        // Update edge visibility
        const edgeIndex = state.edges.findIndex(e => 
          e.source === questionId && e.sourceChoiceId === choiceId
        );
        if (edgeIndex >= 0) {
          state.edges[edgeIndex] = {
            ...state.edges[edgeIndex],
            isVisible: visible && nodeState.isExpanded
          };
        }
        
        // Recursively update children
        updateSubtreeVisibility(choice.targetQuestionId, visible && nodeState.isExpanded, state);
      }
    });
  }
};
```

## 5. Layout Management

### 5.1 Automatic Positioning

```typescript
const calculateChildPosition = (
  parentQuestionId: string, 
  choiceId: string
): { x: number; y: number } => {
  const parentNode = flowState.nodes[parentQuestionId];
  const parentChoices = treeData.questions[parentQuestionId].choices;
  const choiceIndex = parentChoices.findIndex(c => c.id === choiceId);
  
  // Calculate horizontal offset based on choice position
  const totalChoices = parentChoices.length;
  const choiceWidth = 200; // Estimated node width
  const spacing = 50;
  
  const startX = parentNode.position.x - ((totalChoices - 1) * (choiceWidth + spacing)) / 2;
  const childX = startX + choiceIndex * (choiceWidth + spacing);
  const childY = parentNode.position.y + 150; // Vertical spacing
  
  return { x: childX, y: childY };
};

const useAutoLayout = () => {
  useEffect(() => {
    if (reactFlowInstance) {
      // Auto-arrange nodes when structure changes
      const nodes = convertToReactFlowNodes(flowState);
      const edges = convertToReactFlowEdges(flowState);
      
      // Apply automatic layout if needed
      reactFlowInstance.fitView({ padding: 0.1 });
    }
  }, [flowState.createdNodes.size, reactFlowInstance]);
};
```

## 6. React Flow Integration

### 6.1 Convert Internal State to React Flow Format

```typescript
const convertToReactFlowNodes = (state: FlowState): Node[] => {
  return Array.from(state.createdNodes)
    .filter(questionId => state.nodes[questionId].childrenVisible)
    .map(questionId => {
      const nodeState = state.nodes[questionId];
      const questionConfig = treeData.questions[questionId];
      
      return {
        id: questionId,
        type: 'qnode',
        position: nodeState.position,
        data: {
          questionConfig,
          nodeState,
          onQNodeClick: handleQNodeClick,
          onCNodeClick: handleCNodeClick
        },
        draggable: false
      };
    });
};

const convertToReactFlowEdges = (state: FlowState): Edge[] => {
  return state.edges
    .filter(edge => edge.isVisible)
    .filter(edge => 
      state.nodes[edge.source]?.childrenVisible && 
      state.nodes[edge.target]?.childrenVisible
    )
    .map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      style: { stroke: '#3B82F6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3B82F6',
      }
    }));
};
```

## 7. Visual Specifications

### 7.1 Node Styling

```css
/* Q-Node Styles */
.q-node {
  background: white;
  border: 2px solid #D1D5DB;
  border-radius: 8px;
  padding: 16px;
  min-width: 256px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.q-node.highlighted {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.q-node.expanded {
  border-color: #10B981;
}

/* C-Node Styles */
.c-node {
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #D1D5DB;
  background: #F9FAFB;
  transition: all 0.15s ease;
  cursor: pointer;
}

.c-node:hover {
  border-color: #9CA3AF;
}

.c-node.selected {
  background: #3B82F6;
  color: white;
  border-color: #3B82F6;
}

/* Question Label */
.q-label {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 500;
  color: #111827;
  line-height: 1.4;
}

/* Expand/Collapse Indicator */
.expand-indicator {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: #6B7280;
}
```

## 8. Usage Example

### 8.1 Sample Data Structure

```typescript
const sampleTreeData: TreeData = {
  startQuestionId: "q1",
  questions: {
    "q1": {
      id: "q1",
      label: "How concerned are you about climate change?",
      choices: [
        { id: "low", label: "Not concerned", targetQuestionId: "q2" },
        { id: "med", label: "Somewhat concerned", targetQuestionId: "q3" },
        { id: "high", label: "Very concerned", targetQuestionId: "q3" }
      ]
    },
    "q2": {
      id: "q2", 
      label: "What influences your low concern?",
      choices: [
        { id: "media", label: "Media skepticism", targetQuestionId: "q4" },
        { id: "science", label: "Scientific doubt", targetQuestionId: "q4" }
      ]
    },
    "q3": {
      id: "q3",
      label: "Which aspects worry you most?",
      choices: [
        { id: "env", label: "Environment", targetQuestionId: "q5" },
        { id: "econ", label: "Economy", targetQuestionId: "q6" },
        { id: "health", label: "Health", targetQuestionId: "q5" }
      ]
    }
    // ... more questions
  }
};

// Usage
<InteractiveTreeFlow 
  treeData={sampleTreeData}
  onStateChange={(state) => console.log('Flow state:', state)}
/>
```

## 9. Edge Cases & Considerations

### 9.1 Node Reuse Scenarios
- Multiple C-Nodes pointing to same target Q-Node
- Edge creation to existing vs new nodes
- Visibility management when shared nodes are referenced

### 9.2 Performance Optimizations
- Memoize node/edge conversion functions
- Lazy rendering for large trees
- Efficient state updates with immer or similar

### 9.3 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Focus management for nested clickable areas

## 10. Success Criteria

- ✅ Smooth vertical tree navigation
- ✅ Intuitive click hierarchy (C-Node vs Q-Node)  
- ✅ Reliable expand/collapse functionality
- ✅ Proper node reuse with shared references
- ✅ Multi-selection support per Q-Node
- ✅ Clean visual feedback for all interaction states
- ✅ Responsive layout that handles dynamic tree growth