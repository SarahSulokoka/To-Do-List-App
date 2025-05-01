/**
* To-Do List Application
* ========================
* A simple to-do list application built using HTML, CSS, and JavaScript.
* Users can add, delete, and mark tasks as completed. The tasks are saved
* in the browser's localStorage, so they persist across page reloads.
*
* Features:
* - Add a task by typing in the input field and clicking the "Add" button.
* - Mark tasks as completed by clicking on the task name.
* - Delete tasks by clicking the "✕" button next to the task.
* - Tasks are saved to localStorage and loaded automatically when the page is opened.
*
* Author: [Your Name]
* Date: [Date of creation]
* Version: 1.0
* License: [Optional, if applicable]
* 
* How to Run:
* - Open the `index.html` file in your browser to use the to-do list app.
*
* Technologies Used:
* - HTML
* - CSS
* - JavaScript
*/

window.onload = function () {
    loadTasks();
  };
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
  
    const taskList = document.getElementById("taskList");
  
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
  
    taskInput.value = "";
  
    saveTasks();
  }
  
  function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");
  
    const span = document.createElement("span");
    span.textContent = text;
    span.onclick = function () {
      li.classList.toggle("completed");
      saveTasks();
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      li.remove();
      saveTasks();
    };
  
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
  }
  
  function saveTasks() {
    const listItems = document.querySelectorAll("#taskList li");
    const tasks = [];
  
    listItems.forEach((li) => {
      const text = li.querySelector("span").textContent;
      const completed = li.classList.contains("completed");
      tasks.push({ text, completed });
    });
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
  
    console.log("Saved tasks:", tasks);
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    tasks.forEach((task) => {
      const li = createTaskElement(task.text, task.completed);
      document.getElementById("taskList").appendChild(li);
    });
  }
  