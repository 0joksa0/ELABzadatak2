const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  toDoListTag = document.querySelector(".toDoList"),
  form = document.getElementById("formId");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//storing toDoList in array
var toDoList =
  JSON.parse(localStorage.getItem("toDoList")) == null
    ? new Array()
    : JSON.parse(localStorage.getItem("toDoList"));

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() - 1, 
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), 
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay() - 1,
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";
  firstDayofMonth = firstDayofMonth === -1 ? 6 : firstDayofMonth; 

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    if (toDoList !== null)
      toDoList.forEach((element) => {
        element.date = new Date(element.date);
        if (element.date < new Date()) return;
        if (
          element.date.getFullYear() === currYear &&
          element.date.getMonth() === currMonth &&
          element.date.getDate() === i
        ) {
          console.log("element.date" + element.date);
          console.log("element.time" + element.time);
          console.log("element.name" + element.name);
          console.log("element.description" + element.description);
          isToday += " reserved";
        }
      });
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();

const renderToDoList = () => {
  let liTag = "";
  toDoList =
    JSON.parse(localStorage.getItem("toDoList")) == null
      ? new Array()
      : JSON.parse(localStorage.getItem("toDoList"));
  console.log(toDoList);
  if (toDoList === null) {
    return;
  }
  toDoList.sort((a, b) => {
    let date1 = new Date(a.date);
    let date2 = new Date(b.date);
    return date1 - date2;
  });
  toDoList.forEach((element) => {
    let date = new Date(element.date);
    let taskDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}.`;
    console.log("taskDate" + taskDate);
    liTag += `<div class="toDo"><div class="toDo-left"><h3>${taskDate}</h3><h3>${element.time}</h3></div><div class="toDo-right"><h3>${element.name}</h3><p>${element.description}</p></div></div>`;
  });
  toDoListTag.innerHTML = liTag;
};

renderToDoList();

form.addEventListener("submit", addTask);
//onsubmit = "addTask(this);return false"
function addTask(e) {
  e.preventDefault();
  let name = document.getElementById("title").value;
  let time = document.getElementById("time").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  if (new Date(date) < new Date()) {
    document.getElementById("date").style.borderColor = "red";
    alert("You can't add task in past");
    return;
  }
  let newTask = {
    date: new Date(date),
    time: time,
    name: name,
    description: description,
  };
  console.log(toDoList);
  toDoList.push(newTask);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  renderToDoList();
  renderCalendar();
  console.log(e);
  console.log(form);
  form.reset();
  document.getElementById("date").style.borderColor = "#777";
}

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); 
      currMonth = date.getMonth(); 
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
