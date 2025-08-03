export default function TaskList({ tasks, setTasks, filter }) {
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
				<p className="empty-text">لا توجد مهام حالياً</p>
			) : (
				<strong className="task-counter">
					{filter === "all" && `عدد المهام الكلية: ${filteredTasks.length} 📝`}
					{filter === "done" &&
						`عدد المهام المنجزة: ${filteredTasks.length} ✅`}
					{filter === "undone" &&
						`عدد المهام غير المنجزة: ${filteredTasks.length} 🔄`}
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
				{tasks.length === 5 ? alert("ركز") : ""}
			</ul>
		</>
	);
}
