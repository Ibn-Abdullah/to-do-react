export default function TaskList({ tasks, setTasks, filter, t }) {
	function handleComplete(id) {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		setTasks(updatedTasks);
	}

	function handleDelete(id) {
		const confirmDelete = window.confirm(t.wannaDeleteThisTask);
		if (!confirmDelete) return;
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	}
	const filteredTasks = tasks.filter((task) => {
		if (filter === "done") return task.completed;
		if (filter === "undone") return !task.completed;
		return true; // all
	});
	const taskCountText =
		filter === "all"
			? `${t.noOfAll} ${filteredTasks.length} 📝`
			: filter === "done"
			? `${t.noOfDone} ${filteredTasks.length} ✅`
			: `${t.noOfNot} ${filteredTasks.length} 🔄`;
	return (
		<>
			{tasks.length === 0 ? (
				<p className="empty-text">{t.noTasks}</p>
			) : (
				<p className="task-counter">{taskCountText}</p>
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
			</ul>
		</>
	);
}
