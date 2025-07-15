import React from "react";
function TaskItem({ taskName, deleteTask, completeTask, completed }) {
    return (
        <li className={`Task${completed ? " completed-task" : ""}`}>
            <span className="Task-content">{taskName}</span>
            <div className="task-buttons">
                {completeTask && (
                    <button className="btn btn-success" onClick={() => completeTask(taskName)}>
                        Complete
                    </button>
                )}
                <button className="btn btn-danger" onClick={() => deleteTask(taskName)}>
                    Delete
                </button>
            </div>
        </li>
    );
}
export default TaskItem;