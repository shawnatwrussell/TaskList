var tasksArray = [{
        title: "Take Out Trash",
        id: generateId(),
        created: "04/23/2021",
        dueDate: "04/24/2021",
        completed: false
    },
    {
        title: "Feed the Cats",
        id: generateId(),
        created: "04/23/2021",
        dueDate: "04/24/2021",
        completed: false
    },
    {
        title: "Laundry",
        id: generateId(),
        created: "04/23/2021",
        dueDate: "04/24/2021",
        completed: false
    },
    {
        title: "Take Out Trash",
        id: generateId(),
        created: "04/24/2021",
        dueDate: "04/25/2021",
        completed: false
    },
];



//Start of Bottom Data Table
loadTaskData();

function loadTaskData() {
    let taskData = [];
    taskData = getData();
    displayData(taskData);
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("taskData"));
}

function getData() {
    let taskData = JSON.parse(localStorage.getItem("tasksArray")) || []; //the sign || means OR

    if (taskData.length == 0) {
        taskData = tasksArray;
        localStorage.setItem("tasksArray", JSON.stringify(taskData));
    }
    return taskData;
}

//USER INPUT FROM MODAL
function saveTaskData(formData) {
    let tasks = getData();

    let task = {
        id: generateId(),
        created: new Date(), //Timestamp when inputed
        completed: false,
        title: formData[1].value,
        dueDate: new Date(`${formData[2].value} 00:00`),
    }

    tasks.push(task);
    setLocalStorage(tasks);
    displayData();
}

function generateId() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function displayData(taskData) {
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    //Clear Table First
    resultsBody.innerHTML = "";
    for (let i = 0; i < taskData.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("title").textContent = taskData[i].title;
        dataRow.getElementById("createdDate").textContent = taskData[i].createdDate;
        dataRow.getElementById("dueDate").textContent = taskData[i].dueDate;
        dataRow.getElementById("completed").value = taskData[i].id
        dataRow.getElementById("delete").value = taskData[i].id
        resultsBody.appendChild(dataRow);
    }
    return null;
}

function RenderDate(dateString) {
    let date = new Date(dateString);
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString("en-US", options)
}

//MANIPULATE TASK ITEMS
function completeTaskItem(id) {

}

function editTaskItem(id) {

}

function deleteTaskItem(id) {
    let taskData = getData();
    let task = taskData.find(t => t.id == id);
    let position = taskData.indexOf(task);
    let test = taskData.splice(position, 1);

    setLocalStorage(taskData);
    displayData(GetLocalStorage());
}

function saveEditedTask() {
    //Grabs the Events out of Local Storage
    let taskData = JSON.parse(localStorage.getItem("tasksArray")) || tasksArray;

    let obj = {};
    obj["title"] = document.getElementById("editedTitle").value;
    obj["createdDate"] = document.getElementById("editedCreatedDate").value;
    obj["dueDate"] = document.getElementById("editedDueDate").value;
    //obj["id"] = document.getElementById("newIdNumber").value;

    taskData.push(obj);

    localStorage.setItem("tasksArray", JSON.stringify(taskData));

    //Access the Values from the Form by ID and Add an Object to the Array
    displayEditedData(taskData);
}

function displayEditedData(taskData) {
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    //Clear Table First
    resultsBody.innerHTML = "";
    for (let i = 0; i < taskData.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("editedTitle").textContent = taskData[i].title;
        dataRow.getElementById("editedCreatedDate").textContent = taskData[i].createdDate;
        dataRow.getElementById("editedDueDate").textContent = taskData[i].dueDate;

        resultsBody.appendChild(dataRow);
    }
    return null;
}


function clearCompletedTasks() {
    //use indexOf to find array position of the item to delete
    //use splice(indexOf, 1) to remove only that item

}



function setLocalStorage(data) {
    localStorage.setItem("tasksArray", JSON.stringify(data));
}