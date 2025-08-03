import "./App.css";
import { useState } from "react";
import TaskInput from "./components_/TaskInput";
import TaskList from "./components_/TaskList";
function App() {
	const [tasks, setTasks] = useState([]);
	const [darkMode, setDarkMode] = useState(false);
	const [filter, setFilter] = useState("all"); // all | done | undone

	function toggleDarkMode() {
		setDarkMode((prev) => !prev);
	}
	return (
		<div className={`app-container ${darkMode ? "dark" : ""}`}>
			<h1>مفكرة المهام اليومية</h1>
			<button className="toggle-theme" onClick={toggleDarkMode}>
				{darkMode ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"}
			</button>
			<div className="filters">
				<button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>الكل</button>
				<button className={filter === "undone" ? "active" : ""} onClick={() => setFilter("undone")}>غير منجزة</button>
				<button className={filter === "done" ? "active" : ""} onClick={() => setFilter("done")}>منجزة</button>
			</div>
			<TaskInput tasks={tasks} setTasks={setTasks} />
			<TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
		</div>
	);
}
export default App;
