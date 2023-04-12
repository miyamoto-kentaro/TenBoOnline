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
          <Route
            path={process.env.REACT_APP_HELLO_WORLD + "page1"}
            element={<HomeScreen />}
          />
          <Route
            path={process.env.REACT_APP_HELLO_WORLD + "page2"}
            element={<GamePanel />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
