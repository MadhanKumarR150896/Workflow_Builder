import { useStore } from "./store.js";
import { renderHandleMarkup } from "./handleMarkup.jsx";
import { renderContentMarkup } from "./contentMarkup.jsx";
import { useUpdateNodeInternals } from "reactflow";

export const GenericNode = ({ id, type, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const updateNodeInternals = useUpdateNodeInternals();

  const nodeName = data?.name ?? id.replace(`${type}-`, `${type}_`);
  const onNameChange = (event) => {
    updateNodeData(id, "name", event.target.value);
  };

  const handleMarkup = renderHandleMarkup(id, data);
  const contentMarkup = renderContentMarkup(
    id,
    type,
    data,
    updateNodeData,
    updateNodeInternals
  );

  return (
    <div style={{ border: "1px solid black" }}>
      <div className={`${type}`}>
        <span>{type}</span>
      </div>
      <div className={`${type}-name`}>
        <label>
          Name:
          <input
            className="nodrag nowheel"
            type="text"
            value={nodeName}
            onChange={onNameChange}
          />
        </label>
      </div>
      <div>{contentMarkup}</div>
      {handleMarkup}
    </div>
  );
};
