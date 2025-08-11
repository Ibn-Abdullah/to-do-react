import { useState } from "react";
import { toast } from "react-toastify";

export default function TaskInput({ tasks, setTasks, t }) {
	const [input, setInput] = useState("");

	function handleChange(e) {
		setInput(e.target.value);
	}
	function addTask() {
		if (input.trim() === "") {
			toast.warn(t.enterValidTask);
			return;
		}
		const newTask = {
			id: Date.now(),
			text: input,
			completed: false,
		};
		setTasks([...tasks, newTask]);
		setInput("");
	}
	function handleEnter(e) {
		if (e.key === "Enter") {
			addTask();
		}
	}
	function deleteAll() {
		if (tasks.length === 0) {
			toast.warn(t.itisAlreadyEmpty);
		} else {
			const confirmDelete = window.confirm(t.ruSureToDeleteAll);
			if (!confirmDelete) return;
			setTasks([]);
			toast.error(t.allDeleted);
		}
	}
	return (
		<div className="task-input">
			<input
				type="text"
				placeholder={t.placeholder}
				value={input}
				onChange={handleChange}
				onKeyDown={handleEnter}
			/>
			<div className="input-buttons">
				<button onClick={addTask}>{t.add}</button>
				<button onClick={deleteAll} style={{ backgroundColor: "#cc3d3d" }}>
					{t.deleteAll}
				</button>
			</div>
		</div>
	);
}
