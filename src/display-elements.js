import {library, createElem} from "./create-elements.js";

// create a function for displaying all lists in library
function displayLibrary() {
  // if .lists div already has content, reset it's textContent before calling displayList()
  if (document.querySelector(".lists").textContent !== "") document.querySelector(".lists").textContent = "";

  // display each list in library
  for (const list in library) {
    displayList(library[list]);
  }
}

function displayList(list) {
  const listDiv = createElem("div", "list", ""); // create a div for the list
  
  // for each key in list
  for (const key in list) {

    // if the key is "title", create a h3 element and append it to listDiv
    if (key === "title") {
      const title = createElem("h3", key, list[key])
      listDiv.appendChild(title);
    } else {
      const tasks = displayTasks(list[key])
      listDiv.appendChild(tasks)
    };   
  };
  document.querySelector(".lists").appendChild(listDiv); // append listDiv to .lists div
};

// create a function for displaying tasks as divs
function displayTasks(tasksArray) {

  // create and return a div that will keep all the tasks 
  const div = createElem("div", "tasksContainer", "");
  // for each task create a div to keep all the info paragraphs
  for (const task of tasksArray) {
    const taskDiv = createElem("div", "task", "");

    // for each key in task, create a p element using the key's name and value
    for (const key in task) {
      const p = createElem("p", key, task[key]);
      taskDiv.append(p)
    }
    console.log(taskDiv);
    div.append(taskDiv);
  }
  return div;
};

export {displayLibrary};