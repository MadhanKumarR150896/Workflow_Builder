export const renderEmailNode = (id, data, updateNodeData) => (
  <>
    <label>
      To:
      <input
        value={data?.email ?? ""}
        onChange={(event) => {
          updateNodeData(id, "email", event.target.value);
        }}
        className="nodrag nowheel"
        type="email"
      />
    </label>
    <label>
      Subject:
      <input
        value={data?.text ?? ""}
        onChange={(event) => {
          updateNodeData(id, "text", event.target.value);
        }}
        className="nodrag nowheel"
        type="text"
      />
    </label>
  </>
);
