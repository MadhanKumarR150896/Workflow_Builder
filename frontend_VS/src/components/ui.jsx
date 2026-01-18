import "reactflow/dist/style.css";
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../utils/store.js";
import { useShallow } from "zustand/shallow";
import { GenericNode } from "../utils/genericNode.jsx";
import './ui.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  inputNode: GenericNode,
  llmNode: GenericNode,
  outputNode: GenericNode,
  textNode: GenericNode,
  emailNode: GenericNode,
};


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const defaultHandle = (type) => {
  let handle = {
    inputNode: { source: ["output"], target: [] },
    textNode: { source: ["output"], target: [] },
    outputNode: { source: [], target: ["input"] },
    emailNode: { source: [], target: ["input"] },
    llmNode: { source: ["output"], target: ["input"] },
  };

  return handle[type];
};

const getInitNodeData = (nodeID, type) => {
  let nodeData = {
    id: nodeID,
    nodeType: `${type}`,
    handle: defaultHandle(type),
  };
  return nodeData;
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(useShallow(selector));

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);

        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} className="ui-zone">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          connectionLineStyle={{ stroke: '#495057', strokeWidth: 2 }}
          className="nowheel"
        >
          <Background color="#000" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
