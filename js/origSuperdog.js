var eventsArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

//Default Display is All Events
var filteredEvents = eventsArray;

function buildDropDown() {
    var eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(filteredEvents.map((event) => event.city))];

    let linkHTMLEnd = `<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>`;
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats();
}


//Get the Events for the Selected City
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || eventsArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;

    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }

    displayStats();
}


function displayStats() {
    let total = 0;
    let most = 0;
    let average = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }
    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}




//Start of Bottom Data Table
loadEventData();

function loadEventData() {
    let eventData = [];
    eventData = getData();
    displayData(eventData);
}

function getData() {
    let eventData = JSON.parse(localStorage.getItem("eventsArray")) || []; //the sign || means OR

    if (eventData.length == 0) {
        eventData = eventsArray;
        localStorage.setItem("eventsArray", JSON.stringify(eventData));
    }
    return eventData;
}

function saveEventData() {
    //Grabs the Events out of Local Storage
    let eventData = JSON.parse(localStorage.getItem("eventsArray")) || eventsArray;

    let obj = {};
    obj["name"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;
    obj["state"] = document.getElementById("newEventState").value;
    obj["attendance"] = document.getElementById("newEventAttendnce").value;
    obj["date"] = document.getElementById("newEventDate").value;

    eventData.push(obj);

    localStorage.setItem("eventsArray", JSON.stringify(eventData));

    //Access the Values from the Form by ID and Add an Object to the Array
    displayData(eventData);
}

function displayData(eventData) {
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    //Clear Table First
    resultsBody.innerHTML = "";
    for (let i = 0; i < eventData.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("name").textContent = eventData[i].event;
        dataRow.getElementById("city").textContent = eventData[i].city;
        dataRow.getElementById("state").textContent = eventData[i].state;
        dataRow.getElementById("attendance").textContent = eventData[i].attendance;
        dataRow.getElementById("date").textContent = (eventData[i].date);

        resultsBody.appendChild(dataRow);
    }
    return null;
}