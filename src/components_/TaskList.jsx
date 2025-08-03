export default function TaskList({ tasks, setTasks, filter, t }) {
	function handleComplete(id) {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		setTasks(updatedTasks);
	}

	function handleDelete(id) {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	}
	const filteredTasks = tasks.filter((task) => {
		if (filter === "done") return task.completed;
		if (filter === "undone") return !task.completed;
		return true; // all
	});
	return (
		<>
			{tasks.length === 0 ? (
				<p className="empty-text">{t.noTasks}</p>
			) : (
				<strong className="task-counter">
					{filter === "all" && `${t.noOfAll} ${filteredTasks.length} 📝`}
					{filter === "done" && `${t.noOfDone} ${filteredTasks.length} ✅`}
					{filter === "undone" && `${t.noOfNot} ${filteredTasks.length} 🔄`}
				</strong>
			)}
			<ul className="task-list">
				{filteredTasks.map((task) => (
					<li key={task.id} className={task.completed ? "done" : "undone"}>
						<span>{task.text}</span>
						<div className="task-buttons">
							<button className="done" onClick={() => handleComplete(task.id)}>
								✅
							</button>
							<button className="delete" onClick={() => handleDelete(task.id)}>
								❌
							</button>
						</div>
					</li>
				))}
				{tasks.length === 5 ? alert("!!!!!!!!!!!!!") : ""}
			</ul>
		</>
	);
}
