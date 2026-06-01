let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("task-count");
const input = document.getElementById("input");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    let remaining = tasks.filter(task => !task.completed).length;
    taskCount.innerText = `Tasks Remaining: ${remaining}`;
}

function createTaskElement(task, index) {

    let li = document.createElement("li");

    li.innerHTML = `
        <span>${task.text} (${task.priority} Priority)</span>
    `;

    if (task.priority === "High") {
        li.style.color = "red";
    } else if (task.priority === "Medium") {
        li.style.color = "orange";
    } else {
        li.style.color = "green";
    }

    if (task.completed) {
        li.classList.add("completed");
    }

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.classList.add("done-btn");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    doneBtn.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        loadTasks();
    });

    deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        loadTasks();
    });

    li.addEventListener("dblclick", () => {
        let newTask = prompt("Edit Task:", task.text);

        if (newTask !== null && newTask.trim() !== "") {
            tasks[index].text = newTask;
            saveTasks();
            loadTasks();
        }
    });

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function loadTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        createTaskElement(task, index);
    });

    updateTaskCount();
}

document.getElementById("btn").addEventListener("click", () => {

    let taskText = input.value.trim();
    let priority = document.getElementById("priority").value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        priority: priority,
        completed: false
    });

    saveTasks();
    loadTasks();

    input.value = "";
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("btn").click();
    }
});

document.getElementById("clear-all-btn").addEventListener("click", () => {

    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveTasks();
        loadTasks();
    }
});

loadTasks();