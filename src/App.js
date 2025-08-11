import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import "./App.css";
import { FaItchIo, FaInstagram, FaTwitter } from "react-icons/fa";
import translations from "./translations";
import TaskInput from "./components_/TaskInput";
import TaskList from "./components_/TaskList";
import { ToastContainer, toast } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "react-toastify/dist/ReactToastify.css";

const APP_VERSION = "1.3.0";
const APP_DATE = "2025-08-12";
setTimeout(() => {
	toast.info("This version stores data !!!", { autoClose: 4000 });
});

function App() {
	useEffect(() => {
		const lastVersion = localStorage.getItem("app_version");
		if (lastVersion !== APP_VERSION) {
			toast.info(`Version : ${APP_VERSION} 🚀`);
			localStorage.setItem("app_version", APP_VERSION);
		}
	}, []);
	const { darkMode, toggleTheme } = useContext(ThemeContext);

	const [tasks, setTasks] = useState(() => {
		const saved = localStorage.getItem("tasks");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const [language, setLanguage] = useState(() => {
		return localStorage.getItem("language") || "ar";
	});

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);
	const [filter, setFilter] = useState("all");

	const t = translations[language] || translations["ar"];

	return (
		<>
			<div className="app-container">
				<ToastContainer position="bottom-left" autoClose={3000} />
				<SpeedInsights />

				<header>
					<h1>{t.title}</h1>
					<button className="toggle-theme" onClick={toggleTheme}>
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

				<footer className="app-footer">
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
							rel="noopener noreferrer"
							title="Itch.io Profile">
							<FaItchIo size={40} />
						</a>
						<a
							href="https://x.com/haz_man_twit"
							target="_blank"
							rel="noopener noreferrer"
							title="Itch.io Profile">
							<FaTwitter size={40} />
						</a>
					</div>
				</footer>
			</div>
			<footer>
				App Version: {APP_VERSION} by Date {APP_DATE}
			</footer>
		</>
	);
}

export default App;
