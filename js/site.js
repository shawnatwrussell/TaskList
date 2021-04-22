//RUNS WHEN PAGE COMPLETES LOADING
$(function () {
    prepareLocalStorage();
    listTasks();

    //TRIGGERS TOOLTIPS ON HOVER
    document.querySelectorAll(`[data-toggle = "tooltip"]`).tool - tip({
        trigger: "hover"
    });
    // jQuery version: $(`[data-toggle = "tooltip"]`).tool - tip({trigger: "hover"});

    //SET TASK COUNT
    document.getElementById("taskCount").innerText = `CURRENT TASKS (${getTaskCount()})`;
    //jQUery version: $("#taskCount").text(`CURRENT TASKS (${getTAskCount()})`);

})

//CREATES AN EMPTY ARRAY
function prepareLocalStorage() {
    if (getLocalStorage() == null)
        setLocalStorage(new Array());
}

//USER INPUT FROM MODAL
function createTask(formData) {
    let tasks = getLocalStorage();

    let task = {
        id: generateId(),
        created: new Date(),  //Timestamp when inputed
        completed: false,
        title: formData[1].value,
        dueDate: new Date(`${formData[2].value} 00:00`),
    }

    tasks.push(task);
    setLocalStorage(tasks);
    listTasks();
}

function editTaskData() {

}

//SAVE EDITED TASK INFO
function saveTask() {

}



function generateId() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//DISPLAY IN TABLE
function listTasks() {
    const template = document.getElementById("taskItems-Template");
    const tasksBody = document.getElementById("tasksBody");
    //Grabs the Events out of Local Storage
    let tasks = getLocalStorage();
    tasksBody.innerHTML = "";
    for (var row = 0; row < tasks.length; row++) {
        const taskRow = document.importNode(template.contentEditable, true);

        if (tasks[row].completed)

        taskRow.getElementById("id").textContent = tasks[row].id;
        taskRow.getElementById("title").textContent = tasks[row].title;
        taskRow.getElementById("created").textContent = renderDate(tasks[row].created);
        taskRow.getElementById("dueDate").textContent = renderDate(tasks[row].dueDate);
        taskRow.getElementById("tdCrud").setAttribute("data-id", tasks[row].id)

        taskBody.appendChild(taskRow);
    }
}


function deleteTask(element) {
    clearToolTip();

    let index = getIndex(element);
    let tasks = getLocalStorage();
    tasks.splice(index, 1);
    setLocalStorage(tasks);
    listTasks();
}

function completeTask(element) {
    clearToolTip();

    let tasks = getLocalStorage();
    let taskId = getTaskId(element);
    let task = tasks.find(t => t.id == taskId);
    task.completed = true;
    setLocalStorage(tasks);
    listTasks();
}

function getIndex(element) {

}

function getTaskCount() {

}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("taskData"));
}

function setLocalStorage(data) {
    localStorage.setItem("taskData", JSON.stringify(date));
}

//??Format date??
function renderDate(date) {

}

function getTaskId(element) {

}

function clearToolTip() {

}



function popEditModal() {

}


function completeTask(button) {
    let cell = button.parentNode;
    let row = cell.parentNode;
    let cellId = row.children[0];
    let taskId = cellId.innerText;
    let tasksArray = getLocalStorage();
    let task = tasksArray.find(t => t.id == taskId);
    task.completed = true;

    setLocalStorage(tasksArray);
    listTasks(tasksArray);
}



















//function triggerCustomAlert() {}






//function displayTask(taskArray) {dataRow.getElementById("id").textContent = taskArray[row].id;}







//function taskData() {completed:created:dueDate:id:title:}
//function displayTask(taskArray) {}
//function editTaskData(){}
//function filterTaskData(){}
//function saveFilteredData(){}
//function createTaskArray(){}
//function displayFilteredData(){}
//
//function clearTask() {}
//function getTaskData() {
//let taskData = JSON.parse(localStorage.getItem("tasksArray")) || []; //the sign || means OR
//if (taskData.length == 0) {
//taskData = tasksArray;
//localStorage.setItem("tasksArray", JSON.stringify(taskData));
//}
//return taskData;}
//Data from USER INPUT-MODAL
//function saveTask() {
//Grabs the Events out of Local Storage
//let taskData = JSON.parse(localStorage.getItem("tasksArray")) || tasksArray;

//let obj = {};
//obj["title"] = document.getElementById("title").value;
//obj["dueDate"] = document.getElementById("dueDate").value;

//taskData.push(obj);

// localStorage.setItem("tasksArray", JSON.stringify(taskData));

//Access the Values from the Form by ID and Add an Object to the Array
//listTasks(taskData);}