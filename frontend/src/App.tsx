import "./App.css";
import { useState } from "react";
import SettingsMenu from "./components/SettingsMenu";
import NavBar from "./components/NavBar"; //
import Home from "./components/Home";
import Timer from "./components/Timer";
import ToDoList from "./ToDoList";
import GooberMenu from "./components/GooberMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // had to add because bootstrap defaults to light mode
  document.documentElement.setAttribute("data-bs-theme", "dark");

  // Current Players data
  const [currentXP, setXP] = useState(50);
  const [level, setLevel] = useState(9);
  const [money, setMoney] = useState(0);
  const [currentHealth, setHealth] = useState(50);

  // task completion gives user award and goober health.
  const completeTask = () => {
    // i put complete task here because setMoney and set Health are defined above.
    setHealth((health) => Math.min(100, health + 10));
    setMoney((money) => money + 5);
  };

  // unchecking a task takes the reward back, the opposite of completeTask.
  const uncompleteTask = () => {
    setHealth((health) => Math.max(0, health - 10));
    setMoney((money) => money - 5);
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <NavBar />
        </div>
        <GooberMenu
          setXP={setXP}
          setLevel={setLevel}
          setMoney={setMoney}
          setHealth={setHealth}
          currentXP={currentXP}
          level={level}
          money={money}
          currentHealth={currentHealth}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<SettingsMenu />} />
          <Route path="/timer" element={<Timer />} />
          <Route
            path="/todo"
            element={
              <ToDoList
                onComplete={completeTask}
                onUncomplete={uncompleteTask}
              />
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
