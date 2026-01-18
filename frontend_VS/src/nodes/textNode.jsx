import TextareaAutosize from "react-textarea-autosize";

export const RenderTextNode = ({ dataText, onTextChange }) => (
  <label>
    Input
    <TextareaAutosize
      value={dataText}
      onChange={onTextChange}
      className="nodrag nowheel"
      minRows={4}
      maxRows={10}
    />
  </label>
);
