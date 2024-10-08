import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // Initial state for tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from local storage on mount
    loadTasks();
  }, []);

  // Function to add a new task
  const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      // Create a new task container
      const taskContainer = createTaskContainer(taskText);
      // Add the task container to the task list
      const taskList = document.getElementById("taskList");
      taskList.appendChild(taskContainer);
      // Clear the input field
      taskInput.value = ""; 
      // Save the tasks to local storage
      saveTasks();
    }
  };

  // Function to create a new task container
  const createTaskContainer = (taskText, completed = false) => {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";

    const taskTextElement = document.createElement("span");
    taskTextElement.className = "task-text";
    taskTextElement.textContent = taskText;

    if (completed) {
      taskTextElement.classList.add("completed");
    }

    const completeButton = document.createElement("button");
    completeButton.className = "complete-button"; 
    completeButton.textContent = "Complete";
    completeButton.onclick = function () {
      // Toggle complete class on the task text element
      taskTextElement.classList.toggle("completed");
      // Save the tasks to local storage
      saveTasks();
    };

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button"; 
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      // Remove the task container from the task list
      taskContainer.remove();
      // Save the tasks to local storage
      saveTasks();
    };

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(removeButton);

    taskContainer.appendChild(buttonContainer);
    taskContainer.appendChild(taskTextElement);

    return taskContainer;
  };

  // Function to save tasks to local storage
  const saveTasks = () => {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.querySelectorAll(".task-container").forEach(function (taskContainer) {
      const taskText = taskContainer.querySelector(".task-text").textContent;
      const isCompleted = taskContainer.querySelector(".task-text").classList.contains("completed");
      tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to load tasks from local storage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(function (task) {
      const taskContainer = createTaskContainer(task.text, task.completed);
      taskList.appendChild(taskContainer);
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input type="text" id="taskInput" placeholder="Add a new task" style={{ fontSize: 'large' }} />
        <span className="add-task-button" onClick={addTask}>Add Task</span>
      </div>
      <div id="taskList" className="task-grid"></div>
    </div>
  );
}

export default App;

