"use strict";

function ghs__(tag) {
  return document.querySelector(tag);
}

var addButton = ghs__("#add");
var searchButton = ghs__("#search");
var taskArea = ghs__(".task-area");
var taskList = ghs__(".task-list");
var errId = ghs__("#err-id");
var error = ghs__("#error");
var deleteId = ghs__("#delete");
var deleteTask = document.querySelectorAll(".task-list");

/*
 *
 *
 * FOR ADDING TASK LIST
 *
 *
 */

addButton.onclick = (e) => {
  var item = ghs__("#add-task").value.trim();
  if (item) {
    var newTask = `
    <div class="task-list">
          <span id="note">${item}</span>
          <div class="btn-area">
            <button id="edit"><i class="bi bi-pencil-square"></i></button>
            <button id="delete"><i class="bi bi-trash"></i></button>
          </div>
        </div>
    `;
    taskArea.innerHTML += newTask;
    error.style.display = "none";
    ghs__("#add-task").value = "";
    ghs__("#note").setAttribute("isEdit", "");
  } else {
    errId.style.display = "block";
    error.style.display = "block";
    error.textContent = "Please Write A Note !";
  }
};

/*
 *
 *
 * FOR REMOVING TASK LIST
 *
 *
 */

taskArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash")) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
});

/*
 *
 *
 * FOR DELETING TASK LIST
 *
 *
 */

taskArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-pencil-square")) {
    e.target.parentElement.parentElement.parentElement.children[0].setAttribute(
      "isEdit",
      +1
    );
    var taskValue =
      e.target.parentElement.parentElement.parentElement.children[0]
        .textContent;
    ghs__("#add-task").value = taskValue;
  }
});

/*
 *
 *
 * SEARCH OPTION ADDED
 *
 */
const filterItems = (value) => {
  for (var i = 0; i < taskArea.children.length; i++) {
    var item = taskArea.children[i].textContent.toLowerCase();

    //  console.log(taskArea.children[i]);
    if (item.indexOf(value) > -1) {
      taskArea.children[i].style.display = "";
    } else {
      taskArea.children[i].style.display = "none";
    }
  }
};

ghs__("#add-task").addEventListener("keyup", (e) => {
  var item = ghs__("#add-task").value.toLowerCase().trim();
  if (item) {
    errId.style.display = "none";
    error.style.display = "none";
    //console.log(item);
    filterItems(item);
  } else {
    errId.style.display = "block";
    error.style.display = "block";
    error.textContent = "Please Search Something";
  }
});

setTimeout(() => {
  errId.style.display = "none";
  error.style.display = "none";
}, 3000);
