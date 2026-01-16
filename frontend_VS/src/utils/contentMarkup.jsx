import { renderEmailNode } from "../nodes/emailNode";
import { renderInputNode } from "../nodes/inputNode";
import { renderLLMNode } from "../nodes/llmNode";
import { renderOutputNode } from "../nodes/outputNode";
import { renderTextNode } from "../nodes/textNode";

export const renderContentMarkup = (
  id,
  type,
  data,
  updateNodeData,
  updateNodeInternals
) => {
  const dataMode = data?.mode ?? "text";
  const onModeChange = (event) => {
    updateNodeData(id, "mode", event.target.value);
  };

  const dataText = data?.text ?? "";
  const onTextChange = (event) => {
    const textValue = event.target.value;

    if (textValue === "{{input}}") {
      updateNodeData(id, "handle", {
        ...data.handle,
        target: [...data.handle.target, "input"],
      });
      updateNodeInternals(id);
      updateNodeData(id, "text", "");
      return;
    }

    if (textValue === "{{output}}") {
      updateNodeData(id, "handle", {
        ...data.handle,
        source: [...data.handle.source, "output"],
      });
      updateNodeInternals(id);
      updateNodeData(id, "text", "");
      return;
    }

    updateNodeData(id, "text", textValue);
  };

  switch (type) {
    case "inputNode":
      return renderInputNode(
        id,
        data,
        updateNodeData,
        dataMode,
        onModeChange,
        dataText,
        onTextChange
      );

    case "textNode":
      return renderTextNode(dataText, onTextChange);

    case "llmNode":
      return renderLLMNode(id, data, updateNodeData, dataText, onTextChange);

    case "outputNode":
      return renderOutputNode(id, data, dataMode, onModeChange);

    case "emailNode":
      return renderEmailNode(id, data, updateNodeData);

    default:
      return null;
  }
};
