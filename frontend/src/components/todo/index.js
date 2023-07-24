import React, { useState } from 'react';
import './style.css';

const initialTasks = ['Buy Groceries', 'Pay Bills', 'Walk the Dog'];

const ToDo = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <>
      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            id="todo-input"
            className="todo-input"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button id="add-task-btn" onClick={addTask}>
            Add Task
          </button>
        </div>
      <ul id="todo-list" className="todo-list">
        {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : 'todo-item'}>
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => toggleTask(index)}
              checked={task.completed}
              />
            <span>{task}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
        </div>
    </>
  );
};

export default ToDo;
