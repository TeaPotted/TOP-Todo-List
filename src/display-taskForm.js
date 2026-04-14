import {createElem, createLabel, createOption, createInputContainer, createButton} from "./create-elements.js";
import { displayLibrary } from "./display-elements.js";

// create a function that will remove the "add new task" form from the list's div
function closeTaskForm(listDiv) {
  // get the form element in listDiv
  const form = listDiv.querySelector("form");
  listDiv.removeChild(form); // remove the form from listDiv
};

function addTaskForm(list) {
  // get the list's div using it's data-id attribute
  const listDiv = document.querySelector(`[data-id="${list.id}"]`);

  // get the "Add Task" button in listDiv
  const addTaskBtn = listDiv.querySelector(".addTask");
  
  // create a "cancel" button
  const cancelBtn = createButton("cancelTaskBtn", "Cancel");
  cancelBtn.addEventListener("click", () => {
    closeTaskForm(listDiv); // close the list's "add task" form
    cancelBtn.replaceWith(addTaskBtn) // switch cancelBtn back to addTaskBtn
  });

  addTaskBtn.replaceWith(cancelBtn); // switch addTaskBtn to cancelBtn
  
  // create a form for creating new tasks
  const form = document.createElement("form");

  // create a div for the task title, description and due date
  // each div will hold a label and input
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

  const doneBtn = createButton("doneBtn", "Done"); 
  // when doneBtn clicked, call addTask method using form inputs and displayLibrary()
  doneBtn.addEventListener("click", () => {
    list.addTask
      (titleDiv.querySelector("#taskTitle").value, descDiv.querySelector("#taskDescription").value, 
       dueDateDiv.querySelector("#taskDueDate").value, prioritySelect.value);
    displayLibrary();
  });

  // append all the divs and done button to form, then append form to listDiv
  form.append(titleDiv, descDiv, dueDateDiv, priorityDiv, doneBtn);
  listDiv.append(form)
};
export {addTaskForm}