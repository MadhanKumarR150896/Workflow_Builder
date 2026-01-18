import { useStore } from "../utils/store";
import { useShallow } from "zustand/shallow";
import './integrator.css'
import { useState } from "react";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const PipelineIntegrator = () => {
  const { nodes, edges } = useStore(useShallow(selector));
  const API_URL = import.meta.env.VITE_API_URL;

  const [pipelineData, setPipelineData] = useState(null);

 async function sendPipeline() {
    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      console.log(data)

      setPipelineData(data);
     
    } catch (error) {
      console.error(
        "Couldn't provide the required data, please check the request",
        error
      );
    }
  }

  
  return (
    <div className="integrator">
      {pipelineData && (
        <div className="pipeline-alert">
        <span>Total Nodes : <strong>{pipelineData?.num_nodes}</strong></span>
        <span>Total Edges : <strong>{pipelineData?.num_edges}</strong></span>
        <span>Is DAG : <strong>{pipelineData?.is_dag ? "Absolutely" : "Not this time"}</strong></span>
      </div>
      )}
      <button className="submit-button"
        onClick={sendPipeline}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};
