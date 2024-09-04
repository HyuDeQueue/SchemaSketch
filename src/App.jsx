import "./App.css";
import { Outlet } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Outlet />
      </DndProvider>
    </>
  );
}

export default App;
