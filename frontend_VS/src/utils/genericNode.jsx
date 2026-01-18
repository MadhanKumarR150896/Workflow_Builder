import { memo, useEffect, useState } from "react";
import { useStore } from "./store.js";
import { RenderHandleMarkup } from "./handleMarkup.jsx";
import { RenderContentMarkup } from "./contentMarkup.jsx";
import { useUpdateNodeInternals } from "reactflow";

export const GenericNode = memo(({ id, type, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const updateNodeInternals = useUpdateNodeInternals();
  const [nodeName, setNodeName] = useState(
    data?.name ?? id.replace(`${type}-`, `${type}_`)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nodeName !== data?.name) {
        updateNodeData(id, "name", nodeName);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updateNodeData, nodeName, id, data?.name]);

  const onNameChange = (event) => {
    setNodeName(event.target.value);
  };

  return (
    <div className="generic-node">
      <div className="node-title">
        <span>{type}</span>
      </div>
      <div className="node-name">
        <label>
          Name
          <input
            className="nodrag nowheel"
            type="text"
            value={nodeName}
            onChange={onNameChange}
          />
        </label>
      </div>
      <div className={`${type}-container content-container`}>
        <RenderContentMarkup
          id={id}
          type={type}
          data={data}
          updateNodeData={updateNodeData}
          updateNodeInternals={updateNodeInternals}
        />
      </div>
      <RenderHandleMarkup id={id} data={data} />
    </div>
  );
});
