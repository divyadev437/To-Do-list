import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import TaskItem from './components/TaskItem';

function App() {
  const [newTask, setNewTask] = useState("");
  const [myTasks, setMyTasks] = useState([]);
  const [CompletedTasks, setCompletedTasks] = useState([]);

  function handleInput(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setMyTasks(prev => [...prev, newTask]);
      setNewTask("");
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#43e97b', '#38f9d7', '#a18cd1', '#fff']
      });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function deleteTask(taskName) {
    setMyTasks(prev => prev.filter(x => x !== taskName));
    setCompletedTasks(prev => prev.filter(x => x !== taskName));
    confetti({
      particleCount: 60,
      angle: 180,
      spread: 60,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff5858', '#f09819'],
      ticks: 200
    });
  }

  function completeTask(taskName) {
    setCompletedTasks(prev => [...prev, taskName]);
    setMyTasks(prev => prev.filter(x => x !== taskName));
    confetti({
      particleCount: 60,
      angle: 0,
      spread: 60,
      startVelocity: 40,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#43e97b', '#38f9d7']
    });
  }

  return (
    <div className="main-body">
      {/* Glowing floating 3D shapes */}
      <div className="floating-shape"></div>
      <div className="floating-shape" style={{ top: '30%', left: '80%' }}></div>
      <div className="floating-shape" style={{ top: '70%', left: '20%' }}></div>

      <div className="ToDo-List-main">
        <h2>TO-DO List</h2>

        {/* Task Input Area */}
        <div className="todo-task-input-div">
          <div className="form-floating w-85">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter your to-do task"
              onChange={handleInput}
              value={newTask}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingInput">Enter your to-do task</label>
          </div>
          <button
            className="btn btn-danger"
            id="add-button"
            onClick={addTask}
            title="Add Task"
          >+</button>
        </div>

        {/* Pending Tasks */}
        <ul className="tasks-list">
          {myTasks.length === 0 && (
            <div className="empty-state">🎉 No tasks yet! Add your first to-do above.</div>
          )}
          {myTasks.map((task, index) => (
            <TaskItem
              taskName={task}
              key={index}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </ul>

        {/* Completed Tasks */}
        <h3 style={{ color: 'black', marginTop: '32px', marginBottom: '12px' }}>Completed Tasks</h3>

        <div className="completed-tasks-box">
          <ul className="tasks-list">
            {CompletedTasks.length === 0 && (
              <div className="empty-state">✅ No completed tasks yet!</div>
            )}
            {CompletedTasks.map((task, index) => (
              <TaskItem
                taskName={task}
                key={index}
                deleteTask={deleteTask}
                completed={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
