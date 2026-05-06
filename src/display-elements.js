import {library, createElem} from "./create-elements.js";
import {addTaskForm} from "./display-taskForm.js";
import { viewList } from "./display-full-list.js";
import { deleteStorageList } from "./edit-storage.js";
import { format } from "date-fns";

// create a function for displaying all lists in library
function displayLibrary() {
  // if .lists div already has content, reset it's textContent before calling displayList()
  if (document.querySelector(".lists").textContent !== "") document.querySelector(".lists").textContent = "";

  // display each list in library
  for (const list in library) {
    displayList(library[list]);
  }
  
  // if the library is empty, display a paragraph saying "No lists. Create a new one!"
  if (library.length === 0) {
    const p = createElem("p", "noLists-p", "No Lists. Create a new one!");
    document.querySelector(".lists").append(p);
  };
}

// create a function that creates and displays DOM elements with the given list
function displayList(list) {
  const listDiv = createElem("div", "list", ""); // create a div for the list
  let tasksNum; // var for keeping track of amount of tasks list has
  
  // for each key in list
  for (const key in list) {
    
    switch (key) {
      // if key is "title", create a h3 element and append it to listDiv
      case "title":
        const title = createElem("h3", key, list[key])
        listDiv.appendChild(title);
        break;
      
      // if key is "tasks", call displayTasks
      case "tasks":
        const tasks = displayTasks(list[key]);
        listDiv.append(tasks)
        // set tasksNum to the amount of items in tasks array
        tasksNum = list[key].length;
        break;

      // if key is "id", set listDiv data-id attribute to the key's value
      case "id":
        listDiv.dataset.id = list[key];
        break;

      default:
        break;
    };
  };

  // create a p element for displaying how many tasks a list has
  const tasksNumParagraph = createElem("p", "tasksNum", `${
    // set the textContent based on tasksNum amount
    tasksNum === 1 ? `${tasksNum} task` : `${tasksNum} tasks`
  }`);

  const buttonsContainer = createElem("div", "buttonsContainer", ""); // container for keeping all the buttons
  
  // create a button for adding a task and append it to listDiv
  const addTaskBtn = createElem("button", "addTask", "+ Add Task")
  addTaskBtn.addEventListener("click", () => {addTaskForm(list)})
  
  // create a button for deleting the list
  const deleteListBtn = createElem("button", "deleteList", "Delete");
  deleteListBtn.addEventListener("click", () => deleteStorageList(list))

  // create a button for viewing the full list and append it to listDiv
  const viewListBtn = createElem("button", "viewList", "View List");
  viewListBtn.addEventListener("click", () => viewList(list));
  
  buttonsContainer.append(addTaskBtn, viewListBtn, deleteListBtn); // append all buttons to buttonsContainer
  listDiv.append(tasksNumParagraph, buttonsContainer); // append taskNumParagraph and buttonsContainer to listDiv
  document.querySelector(".lists").appendChild(listDiv); // append listDiv to .lists div
};

// create a function for displaying tasks as divs
function displayTasks(tasksArray) {

  // create and return a div that will keep all the tasks 
  const div = createElem("div", "tasksContainer", "");
  // for each task create a div to keep all the info paragraphs
  for (const task of tasksArray) {
    const taskDiv = createElem("div", "task", "");

    // for each key in task
    for (const key in task) {
      switch (key) {
        // create a p element for both "taskTitle" and "dueDate" keys
        case "taskTitle":
          const taskTitleP = createElem("p", key, task[key]);
          taskDiv.append(taskTitleP);
          break;
        
        case "dueDate":
          // create a variable for keeping the formatted date
          const formattedDate = format(task[key].split("-"), "d MMMM y")
          const dueDateP = createElem("p", key, formattedDate); // set the textContent to formattedDate
          taskDiv.append(dueDateP);
          break;

        // add a class of the priority value to taskDiv
        case "priority":
          taskDiv.classList.add(task[key]);
          break;

        default:
          break;
      };
    };
    div.append(taskDiv);
  }
  return div;
};

export {displayLibrary};