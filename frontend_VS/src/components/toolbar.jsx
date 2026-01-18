import { DraggableNode } from "../utils/draggableNode.jsx";
import "./toolbar.css";

export const PipelineToolbar = () => {
  const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

  return (
    <div className="toolbar" onDragOver={onDragOver}>
        <DraggableNode type="inputNode" label="Input" />
        <DraggableNode type="llmNode" label="LLM" />
        <DraggableNode type="outputNode" label="Output" />
        <DraggableNode type="textNode" label="Text" />
        <DraggableNode type="emailNode" label="Email" />
    </div>
  );
};
