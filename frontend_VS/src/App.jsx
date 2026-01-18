import { PipelineToolbar } from "./components/toolbar";
import { PipelineUI } from "./components/ui";
import { PipelineIntegrator } from "./components/integrator";
import "./App.css";

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <PipelineUI />
      <PipelineIntegrator />
    </div>
  );
}

export default App;
