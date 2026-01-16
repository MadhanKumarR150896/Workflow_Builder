export const renderOutputNode = (id, data, dataMode, onModeChange) => (
  <>
    <label>
      Format:
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
          Output:
          <pre
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            className="nodrag nowheel"
          >
            {data?.text ?? ""}
          </pre>
        </label>
      )}
      {dataMode === "file" && data?.files?.length > 0 && (
        <label>
          Download:
          <ul style={{ listStyle: "none" }}>
            {data.files.map((file, index) => (
              <li key={`${id}-file${index + 1}`}>
                <a
                  style={{ textDecoration: "none" }}
                  className="nodrag nowheel"
                  href={URL.createObjectURL(file)}
                  download={file.name}
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </label>
      )}

      {dataMode === "file" && (!data?.files || data?.files.length === 0) && (
        <label>
          Download:
          <div>File not found</div>
        </label>
      )}
    </div>
  </>
);
