// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePanel from "./components/GamePanel";
import HomeScreen from "./screens/HomeScreen";
function App() {
  console.log(process.env.REACT_APP_ROOT_URL);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={process.env.REACT_APP_ROOT_URL}
            element={<HomeScreen />}
          />
          <Route
            path={process.env.REACT_APP_ROOT_URL + "page2/"}
            element={<GamePanel />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
