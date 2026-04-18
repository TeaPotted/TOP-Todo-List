import {createButton, createElem} from "./create-elements.js"

// create a function for displaying all of a task's info
function displayTask(task) {
  const taskDiv = createElem("div", "task", ""); // this will keep all the task's info (title, description, etc.)
  for (const key in task) { // get each key in the task object
    switch (key) {
      // create a p element for each value and append it to taskDiv
      case "taskTitle":
      case "description":
      case "dueDate":
        const taskInfo = createElem("p", key, task[key]);
        taskDiv.append(taskInfo);
        break;
      
      case "priority":
        const priority = createElem("p", "priority", task[key]);
        taskDiv.append(priority);
        taskDiv.classList.add(task[key]) // add a class of the task's priority value
        
      default: 
        break;
    };
  }
  return taskDiv;
};

// create a function for displaying all the tasks in a list
function displayTasks(tasks) {
  const tasksContainer = createElem("div", "tasksContainer", "") // this div will keep all the tasks
  
  // for each task in the tasks array, call displayTask() on the task and append it to tasksContainer
  for (const task of tasks) {
    tasksContainer.append(displayTask(task));
  }
  return tasksContainer;
};


// create a function that displays a dialog element 
// of the list this function was called on
function viewList(list) {
  // create a dialog element that will display all the list's info
  const dialog = document.createElement("dialog");
  const listTitle = createElem("h2", "title", list.title)  // create a h2 element for the list's title
  
  // create a button for exiting out of the dialog by removing the dialog from the body
  const closeBtn = createElem("button", "close", "X");
  closeBtn.addEventListener("click", () => document.body.removeChild(dialog));

  // append listTitle, displayTasks() on the list's tasks and closeBtn then append dialog to body
  dialog.append(listTitle, displayTasks(list.tasks), closeBtn)
  document.body.appendChild(dialog);
  dialog.showModal(); // open the dialog so it is visible
};

export {viewList}