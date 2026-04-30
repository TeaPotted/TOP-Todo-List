import {library, createElem, createLabel, createOption, createInputContainer, createButton} from "./create-elements.js";
import { displayLibrary } from "./display-elements.js";
import {viewList} from "./display-full-list.js"
import {addTask} from "./edit-storage.js"


// create a function that will a return a form for creating a new task
function createTaskForm() {
  const form = document.createElement("form"); // create the form that will keep all the inputs
  
  // create a div for the task title, description and due date
  // each div will have a label and input
  const titleDiv = createInputContainer("Title", "taskTitle", "text");
  const descDiv = createInputContainer("Description", "taskDescription", "text");
  const dueDateDiv = createInputContainer("Due Date", "taskDueDate", "date");

  // create a div for the priority label and select element
  const priorityDiv = createElem("div", "input-container", "");
  const priorityLabel = createLabel("taskPriority", "Priority Type");
  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("id", "taskPriority");
  prioritySelect.setAttribute("name", "taskPriority");

  // create options for normal, important and urgent for prioritySelect
  prioritySelect.append(createOption("Normal"), createOption("Important"), createOption("Urgent"))
  priorityDiv.append(priorityLabel, prioritySelect);
  
  // append titleDiv, descDiv, dueDateDiv and priorityDiv to form
  form.append(titleDiv, descDiv, dueDateDiv, priorityDiv);
  
  return form;
};

function addTaskForm(list) {
  // create a dialog that will keep the form and buttons
  const dialog = document.createElement("dialog");

  // get the form for creating new tasks
  const form = createTaskForm();

  // get form's title, description, dueDate and priority inputs
  const taskTitle = form.querySelector("#taskTitle");
  const taskDesc = form.querySelector("#taskDescription");
  const taskDueDate = form.querySelector("#taskDueDate");
  const taskPriority = form.querySelector("#taskPriority");

  // initially set the task inputs for now
  taskTitle.value = "super cool task title";
  taskDesc.value = "Oonga boonga doonga";
  taskDueDate.valueAsDate = new Date();
  taskPriority.value = "Important";

  // create a "done" button that will add the task to the list when clicked
  const doneBtn = createButton("doneBtn", "Done");
  doneBtn.addEventListener("click", () => {
    // if form's inputs are all valid, create a task using form's inputs and add it to lists
    if (form.checkValidity()) {
      addTask(list, taskTitle.value, taskDesc.value, taskDueDate.value, taskPriority.value);

      // remove dialog from body and display the updated library
      document.body.removeChild(dialog);
      displayLibrary();
    }
  });

  // create a "cancel" button that closes the dialog and removes it from body
  const cancelBtn = createButton("cancelTaskBtn", "Cancel");
  cancelBtn.addEventListener("click", () => document.body.removeChild(dialog));

  // append form, doneBtn and cancelBtn to dialog
  dialog.append(form, doneBtn, cancelBtn);
  // append the dialog and make it visible
  document.body.append(dialog);
  dialog.showModal();
};

// create a function that displays a form for edditing a task
function displayEditTaskDialog(task, list) {
  // create a dialog that will display the form
  const dialog = document.createElement("dialog")
  
  // get the form and get it's inputs
  const form = createTaskForm();
  const taskTitle = form.querySelector("#taskTitle");
  const taskDesc = form.querySelector("#taskDescription");
  const taskDueDate = form.querySelector("#taskDueDate");
  const taskPriority = form.querySelector("#taskPriority");

  // initially set the task's input values to the task's values
  taskTitle.value = task["taskTitle"];
  taskDesc.value = task["description"];
  taskDueDate.value = task["dueDate"];
  taskPriority.value = task["priority"];

  // create a "done" button then append it to dialog
  const doneBtn = createButton("doneBtn", "Done");
  doneBtn.addEventListener("click", () => {
    // if form is valid
    if (form.checkValidity()) {
      // set the task's info with the form's inputs
      task["taskTitle"] = taskTitle.value;
      task["description"] = taskDesc.value;
      task["dueDate"] = taskDueDate.value;
      task["priority"] = taskPriority.value;

      // remove the edit dialog and the view full list dialog from body
      document.body.removeChild(dialog);
      document.body.removeChild(document.querySelector("dialog"));
      // display the updated list and updated library
      viewList(list);
      displayLibrary();
      localStorage.setItem("library", JSON.stringify(library)); // update "library" item in localStorage
    };
  });
  // add a "cancel" button that closes the edit task dialog when clicked
  const cancelBtn = createButton("cancelEditBtn", "Cancel");
  cancelBtn.addEventListener("click", () => document.body.removeChild(dialog));

  dialog.append(form, cancelBtn, doneBtn) // append form, doneBtn and cancelBtn to dialog
  // append dialog to body and make it visible
  document.body.append(dialog);
  dialog.showModal();
};

export {addTaskForm, displayEditTaskDialog}