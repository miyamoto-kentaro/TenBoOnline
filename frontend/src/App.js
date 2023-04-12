// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePanel from "./components/GamePanel";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<GamePanel />} />
          <Route path="page1" element={<HomeScreen />} />
          <Route path="page2" element={<GamePanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
