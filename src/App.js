import "./App.css";
import { FaItchIo } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import translations from "./translations";
import TaskInput from "./components_/TaskInput";
import TaskList from "./components_/TaskList";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [tasks, setTasks] = useState(() => {
		const saved = localStorage.getItem("tasks");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch {
				return [];
			}
		}
		return [];
	});
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});
	useEffect(() => {
		// تحديث الكلاس الخاص بالثيم في body
		document.body.classList.remove("dark-body", "light-body");
		document.body.classList.add(darkMode ? "dark-body" : "light-body");

		// حفظ الثيم في localStorage
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);
	const [filter, setFilter] = useState("all");
	const [language, setLanguage] = useState(() => {
		return localStorage.getItem("language") || "ar";
	});
	useEffect(() => {
		// حفظ اللغة في localStorage
		localStorage.setItem("language", language);
	}, [language]);
	const t = translations[language] || translations["ar"];

	function toggleDarkMode() {
		setDarkMode((prev) => {
			const newMode = !prev;

			// إزالة الكلاسات القديمة
			document.body.classList.remove("dark-body", "light-body");

			// إضافة الكلاس الجديد
			document.body.classList.add(newMode ? "dark-body" : "light-body");

			return newMode;
		});
	}

	return (
		<div className={`app-container ${darkMode ? "dark" : ""}`}>
			<ToastContainer position="top-center" autoClose={3000} />
			<SpeedInsights />
			<header>
				<h1>{t.title}</h1>
				<button className="toggle-theme" onClick={toggleDarkMode}>
					{darkMode ? t.light : t.dark}
				</button>
				<button
					className="toggle-language"
					onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
					{language === "ar" ? "English" : "عربي"}
				</button>
			</header>

			<div className="filters">
				<button
					className={filter === "all" ? "active" : ""}
					onClick={() => setFilter("all")}>
					{t.all}
				</button>
				<button
					className={filter === "undone" ? "active" : ""}
					onClick={() => setFilter("undone")}>
					{t.incomplete}
				</button>
				<button
					className={filter === "done" ? "active" : ""}
					onClick={() => setFilter("done")}>
					{t.done}
				</button>
			</div>
			<TaskInput tasks={tasks} setTasks={setTasks} t={t} />
			<TaskList tasks={tasks} setTasks={setTasks} filter={filter} t={t} />
			<footer>
				<p>{t.creator}</p>
				<br />
				<div className="social-icons">
					<a
						href="https://www.instagram.com/hazemjaba244/"
						target="_blank"
						rel="noopener noreferrer"
						title="Instagram Profile">
						<FaInstagram size={40} />
					</a>
					<a
						href="https://haz-man.itch.io/"
						target="_blank"
						title="Itch.io Profile"
						rel="noopener noreferrer">
						<FaItchIo size={40} />
					</a>
				</div>
			</footer>
		</div>
	);
}
export default App;
