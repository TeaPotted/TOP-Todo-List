import {createElem, createLabel, createOption, createInputContainer, createButton} from "./create-elements.js";
import { displayLibrary } from "./display-elements.js";


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

  // create a "done" button that will add the task to the list when clicked
  const doneBtn = createButton("doneBtn", "Done");
  doneBtn.addEventListener("click", () => {
    // if form's inputs are all valid, create a task using form's inputs and add it to lists
    if (form.checkValidity()) {
      list.addTask(taskTitle.value, taskDesc.value, taskDueDate.value, taskPriority.value);

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

export {addTaskForm}