import TextareaAutosize from "react-textarea-autosize";

export const RenderInputNode = ({
  id,
  data,
  updateNodeData,
  dataMode,
  onModeChange,
  dataText,
  onTextChange,
}) => (
  <>
    <label>
      Format
      <select
        value={dataMode}
        onChange={onModeChange}
        className="nodrag nowheel"
      >
        <option value="text">Text</option>
        <option value="file">File</option>
      </select>
    </label>
    <div>
      {dataMode === "text" && (
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
      )}
      {dataMode === "file" && (
        <label>
          Upload
          <input
            className="nodrag nowheel"
            type="file"
            multiple
            onChange={(event) => {
              updateNodeData(id, "files", Array.from(event.target.files));
            }}
          />
          {data.files?.length > 0 && (
            <ul style={{ listStyle: "none" }}>
              {data.files.map((file, index) => (
                <li key={`${id}-file${index + 1}`}>{file.name}</li>
              ))}
            </ul>
          )}
        </label>
      )}
    </div>
  </>
);
