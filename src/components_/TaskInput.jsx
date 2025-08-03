import { useState } from "react";

export default function TaskInput({ tasks, setTasks }) {
	const [input, setInput] = useState("");

	function handleChange(e) {
		setInput(e.target.value);
	}
	function addTask() {
		if (input.trim() === "") return;
		const newTask = {
			id: Date.now(),
			text: input,
			completed: false,
		};
		setTasks([...tasks, newTask]);
		setInput("");
	}
	return (
		<div className="task-input">
			<input
				type="text"
				placeholder="أدخل مهمة جديدة..."
				value={input}
				onChange={handleChange}
			/>
			<button onClick={addTask}>إضافة</button>
		</div>
	);
}
