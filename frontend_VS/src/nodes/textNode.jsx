export const renderTextNode = (dataText, onTextChange) => (
  <label>
    Input:
    <textarea
      value={dataText}
      onChange={onTextChange}
      className="nodrag nowheel"
    ></textarea>
  </label>
);
