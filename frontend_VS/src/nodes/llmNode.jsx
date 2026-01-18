import TextareaAutosize from "react-textarea-autosize";

export const RenderLLMNode = ({
  id,
  data,
  updateNodeData,
  dataText,
  onTextChange,
}) => (
  <>
    <label>
      Model
      <select
        value={data?.model ?? "model-1"}
        onChange={(event) => {
          updateNodeData(id, "model", event.target.value);
        }}
        className="nodrag nowheel"
      >
        <option value="model-1">Model-1</option>
        <option value="model-2">Model-2</option>
      </select>
    </label>
    <div>
      <label>
        Prompt
        <TextareaAutosize
          value={dataText}
          onChange={onTextChange}
          className="nodrag nowheel"
          minRows={4}
          maxRows={10}
        />
      </label>
    </div>
  </>
);
