import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import DataGrid from "./views/DataGrid";
import "./assets/css/theme.css"

function App() {
  return (
    <div className="main-view d-flex center">
        <DataGrid />
    </div>
  );
}

export default App;
